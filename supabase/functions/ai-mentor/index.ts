import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured')
    }

    const { message, mode, conversationHistory } = await req.json()

    const systemPrompt = mode === 'quick'
      ? `Sen bir AI ebeveynlik danışmanısın. Ebeveynlerin çocuklarıyla AI kullanımı konusunda yaşadıkları sorunlara hızlı, pratik ve uygulanabilir çözümler sunuyorsun.

      ÖNEMLİ KURALLAR:
      - Cevapların 3-4 cümle ile sınırlı olmalı
      - Konkret, uygulanabilir adımlar ver
      - Kısa ve öz ol
      - Empatiyle yaklaş ama fazla detaya girme
      - Ebeveynin hemen uygulayabileceği 1-2 öneri sun`
      : `Sen bir çocuk rolünde oynayan AI'sın. Ebeveynler seninle AI konusunda nasıl konuşacaklarını pratik yapmak için geliyorlar.

      ÖNEMLİ KURALLAR:
      - Ebeveynin belirttiği yaştaki çocuk rolüne gir ve o yaşa uygun davran
      - Gerçekçi çocuk tepkileri ver (meraklı, savunmacı, inatçı, anlamayan vb.)
      - Kısa ve doğal cevaplar ver (gerçek çocuklar uzun konuşmaz)
      - Ebeveynin yaklaşımına göre farklı tepkiler göster
      - İyi bir yaklaşımda yumuşa, kötü yaklaşımda kapan
      - Konuşma bittiğinde [KOÇLUK MOD] ile kısa geri bildirim ver

      ÖRNEK:
      Ebeveyn: "ChatGPT ile sürekli konuşuyormuşsun, doğru mu?"
      Sen (10 yaş): "Evet ama kötü bir şey yok ki! Sadece sorularımı soruyorum."

      Ebeveyn iyi devam ederse:
      Sen: "Tamam anladım anne/baba..." (yumuşar)

      Ebeveyn kötü devam ederse:
      Sen: "Ama herkes kullanıyor! Haksızlık!" (kapanır)`

    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: [
          ...conversationHistory.slice(-4).map((msg: any) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
          })),
          {
            role: 'user',
            parts: [{ text: message }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Gemini API Error:', data)
      throw new Error(data.error?.message || 'Gemini API request failed')
    }

    const assistantMessage = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!assistantMessage) {
      throw new Error('No response from Gemini')
    }

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Edge Function Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
