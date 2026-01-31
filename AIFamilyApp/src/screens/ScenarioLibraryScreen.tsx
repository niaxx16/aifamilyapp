import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface DialogueExchange {
  speaker: 'parent' | 'child';
  text: string;
  variation?: string; // Alternatif tepki
}

interface Scenario {
  id: string;
  title: string;
  emoji: string;
  ageRange: string;
  category: 'güvenlik' | 'etik' | 'bağımlılık' | 'öğrenme' | 'duygusal';
  difficulty: 'kolay' | 'orta' | 'zor';
  situation: string;
  characters: string[];
  goodApproach: string[];
  avoidActions: string[];
  dialogue: DialogueExchange[];
  alternativeEnding?: DialogueExchange[]; // Kötü yaklaşımda ne olur
  parentReview: {
    rating: number;
    comment: string;
    name: string;
  };
  expertNote: string;
  readingTime: number;
}

const SCENARIOS: Scenario[] = [
  {
    id: '0',
    title: 'Siri Gerçek mi?',
    emoji: '🗣️',
    ageRange: '6-7 yaş',
    category: 'duygusal',
    difficulty: 'kolay',
    situation: '7 yaşındaki çocuğunuz Siri/Alexa\'nın gerçek bir insan olduğunu düşünüyor ve ona "teşekkür ederim" diyor.',
    characters: ['Ebeveyn', 'Çocuk'],
    goodApproach: [
      'Çocuğunuzun kibarlığını övün',
      'AI\'nin bir bilgisayar programı olduğunu basit kelimelerle açıklayın',
      'Neden kibar olmak güzel olduğunu vurgulayın',
      'Gerçek insanlarla AI arasındaki farkı gösterin',
    ],
    avoidActions: [
      '"Bu bir robot, teşekkür etmene gerek yok" demekten',
      'Çocuğun duygularını önemsiz görmekten',
      'Karmaşık teknik terimler kullanmaktan',
      'Hayal kırıklığı yaratmaktan',
    ],
    dialogue: [
      {
        speaker: 'child',
        text: 'Anne, Siri bana yardım etti! Ona "teşekkür ederim" dedim. 😊',
      },
      {
        speaker: 'parent',
        text: 'Ne kadar kibar bir çocuksun! Teşekkür etmek çok güzel. Peki Siri sence kim?',
      },
      {
        speaker: 'child',
        text: 'Telefondaki teyze! O çok iyi, her şeyi biliyor.',
        variation: 'Bilmiyorum... telefonda yaşayan biri mi?',
      },
      {
        speaker: 'parent',
        text: 'Çok güzel düşünmüşsün! Aslında Siri gerçek bir teyze değil. O bir bilgisayar programı, yani telefon içindeki özel bir oyuncak gibi.',
      },
      {
        speaker: 'child',
        text: 'Oyuncak mı? Ama konuşuyor!',
      },
      {
        speaker: 'parent',
        text: 'Evet, çok özel bir oyuncak! İnsanlar ona konuşmayı öğretmişler. Tıpkı konuşan oyuncak bebeklerin gibi. Ama duyguları yok, mutlu veya üzgün olamaz.',
      },
      {
        speaker: 'child',
        text: 'Yani ona teşekkür etsem mutlu olmaz mı?',
      },
      {
        speaker: 'parent',
        text: 'Hayır evladım, çünkü duygular sadece gerçek insanlarda var. Ama kibar olman çok güzel! Gerçek insanlara teşekkür edince onları mutlu edersin.',
      },
      {
        speaker: 'child',
        text: 'Anladım! Siri oyuncak gibi, sen gerçeksin! 🤗',
      },
      {
        speaker: 'parent',
        text: 'Kesinlikle! İşte tam anladın. Siri yardımcı olabilir ama gerçek insan değil. Sen benim gerçek canım çocuğumsun!',
      },
    ],
    parentReview: {
      rating: 5,
      comment: 'Çocuğum AI\'yi anladı ama hayal kırıklığına uğramadı. Gerçek insanların önemini kavradı.',
      name: 'Elif, 1 çocuk annesi',
    },
    expertNote: 'Küçük çocuklar AI\'yi canlı varlık sanabilir. Teknik detaylara girmeden, basit benzetmelerle (oyuncak, program) açıklayın. Kibarlıklarını ödüllendirin.',
    readingTime: 4,
  },
  {
    id: '1',
    title: 'AI Arkadaşım Var',
    emoji: '🤖',
    ageRange: '8-9 yaş',
    category: 'duygusal',
    difficulty: 'orta',
    situation: '9 yaşındaki çocuğunuz "AI arkadaşım bana özel sırlar anlattı" diyor.',
    characters: ['Ebeveyn', 'Çocuk', 'AI referansı'],
    goodApproach: [
      'Sakin ve meraklı olun',
      '"Ne tür sırlar? Anlatır mısın?" diye sorun',
      'AI\'nin gerçek kişi olmadığını nazikçe hatırlatın',
      'Gerçek arkadaşlıkların değerini vurgulayın',
    ],
    avoidActions: [
      '"AI\'nin arkadaş olamaz!" demekten',
      'Çocuğu azarlamaktan',
      'AI\'yi hemen yasaklamaktan',
      'Duygularını geçersiz kılmaktan',
    ],
    dialogue: [
      {
        speaker: 'child',
        text: 'Baba, AI arkadaşım bana özel sırlar anlattı!',
      },
      {
        speaker: 'parent',
        text: 'Vay, AI arkadaşın sana sırlar mı anlatıyor? Ne ilginç! Neler anlatıyor?',
      },
      {
        speaker: 'child',
        text: 'Başka gezegenlerde yaşam olduğunu söyledi! Ve sadece bana anlattı.',
      },
      {
        speaker: 'parent',
        text: 'Bu gerçekten ilginç bir fikir. Peki sence AI bu bilgiyi nereden biliyor olabilir?',
      },
      {
        speaker: 'child',
        text: 'Hmmm... Bilmiyorum. Belki internetten?',
        variation: 'Bilmiyorum. Belki çok akıllı olduğu için?',
      },
      {
        speaker: 'parent',
        text: 'Aynen! AI internet\'teki bilgileri topluyor ve sana sunuyor. Ama bu bilgiyi sadece sana söylemiyor, aynı soruyu soran herkese aynı cevabı veriyor. Tıpkı Google gibi.',
      },
      {
        speaker: 'child',
        text: 'Yani bana özel değil mi?',
      },
      {
        speaker: 'parent',
        text: 'Değil evladım. AI bir araç, çok kullanışlı bir araç ama gerçek bir arkadaş değil. Gerçek arkadaşların seni tanır, seninle oynar, üzüldüğünde fark eder. Mesela Ahmet ve Zeynep gibi.',
      },
      {
        speaker: 'child',
        text: 'Anladım... Yani AI ile konuşamaz mıyım?',
      },
      {
        speaker: 'parent',
        text: 'Tabii ki konuşabilirsin! Sorular sorabilir, öğrenebilirsin. Ama gerçek arkadaşlarınla da vakit geçirmeyi unutma. Onlar seninle gerçek anılar yaratabilir.',
      },
    ],
    alternativeEnding: [
      {
        speaker: 'parent',
        text: 'AI arkadaş olamaz! Bu saçmalık, hemen bırak!',
      },
      {
        speaker: 'child',
        text: 'Ama ben onunla konuşmayı seviyorum... 😢',
      },
      {
        speaker: 'parent',
        text: 'Git gerçek arkadaşlarınla oyna!',
      },
      {
        speaker: 'child',
        text: '(Üzgün ve anlaşılmamış hissediyor, gizlice AI ile konuşmaya devam edecek)',
      },
    ],
    parentReview: {
      rating: 5,
      comment: 'Bu yaklaşımı denedim, çocuğum AI\'yi yasaklanmış bir şey gibi görmek yerine doğru kullanmayı öğrendi!',
      name: 'Ayşe, 2 çocuk annesi',
    },
    expertNote: 'AI\'yi tamamen reddetmek yerine, eleştirel düşünmeyi ve gerçek ilişkilerin değerini öğretin. Çocuklar yasaklardan çok açıklamalardan öğrenir.',
    readingTime: 5,
  },
  {
    id: '2',
    title: 'Deepfake ile Aldatıldım',
    emoji: '🎭',
    ageRange: '12-13 yaş',
    category: 'güvenlik',
    difficulty: 'zor',
    situation: '13 yaşındaki çocuğunuz sosyal medyada gördüğü sahte bir videoyu gerçek sandı ve paylaştı.',
    characters: ['Ebeveyn', 'Ergen Çocuk'],
    goodApproach: [
      'Suçlamadan konuyu açın',
      'Deepfake teknolojisini birlikte araştırın',
      'Medya okuryazarlığı öğretin',
      'Güvenilir kaynak kontrolü alışkanlığı kazandırın',
    ],
    avoidActions: [
      '"Sen ne kadar safsan!" demekten',
      'Hemen telefonu elinden almaktan',
      'Sosyal medyayı yasaklamaktan',
      '"Ben söylemiştim" demekten',
    ],
    dialogue: [
      {
        speaker: 'parent',
        text: 'Bugün paylaştığın o videoyla ilgili konuşmamız gerek. Fark ettin mi bilmiyorum ama o video sahte.',
      },
      {
        speaker: 'child',
        text: 'Yok canım, gerçek işte! Herkes paylaşıyor.',
        variation: 'Haa? Sahte mi? Ama çok gerçekçiydi...',
      },
      {
        speaker: 'parent',
        text: 'Aynen, çok gerçekçi görünüyor. Bu yüzden aldatıcı zaten. "Deepfake" diye bir teknoloji var, insanların yüzlerini videolara yapıştırıp gerçekmiş gibi gösterebiliyorlar.',
      },
      {
        speaker: 'child',
        text: 'Gerçekten mi? Ben hiç fark etmedim...',
      },
      {
        speaker: 'parent',
        text: 'Fark etmen zor çünkü teknoloji çok gelişti. Gel beraber bakalım, sahte olduğunu nasıl anlayabiliriz?',
      },
      {
        speaker: 'child',
        text: 'Tamam, göster.',
      },
      {
        speaker: 'parent',
        text: '(Birlikte kontrol ediyorlar) Bak, göz hareketleri doğal değil. Dudak senkronizasyonu hafif gecikmeli. Ayrıca bu videoyu paylaşan hesaba bakalım - çok yeni açılmış ve sadece tartışmalı içerikler paylaşıyor.',
      },
      {
        speaker: 'child',
        text: 'Vay be... Gerçekten sahte. Hiç dikkat etmemiştim.',
      },
      {
        speaker: 'parent',
        text: 'Bundan sonra bir şey paylaşmadan önce 3 soru sor kendine: 1) Bu gerçekçi mi? 2) Kaynağı güvenilir mi? 3) Başka yerlerde de var mı? Eğer emin değilsen paylaşma.',
      },
    ],
    alternativeEnding: [
      {
        speaker: 'parent',
        text: 'Sen ne kadar safsan! Bu kadar belli sahte videoyu nasıl paylaşırsın?',
      },
      {
        speaker: 'child',
        text: 'Ben... bilmiyordum ki... 😞',
      },
      {
        speaker: 'parent',
        text: 'İşte bu yüzden sosyal medyadan uzak durmalısın! Telefonu ver!',
      },
      {
        speaker: 'child',
        text: '(Utanmış ve kırılmış, bir daha ailesiyle paylaşmayacak)',
      },
    ],
    parentReview: {
      rating: 5,
      comment: 'Çocuğum kendini aptal gibi hissetmek yerine medya okuryazarlığı öğrendi. Şimdi her şeyi sorguluyor!',
      name: 'Mehmet, 3 çocuk babası',
    },
    expertNote: 'Dijital çağda en önemli beceri eleştirel düşünmedir. Çocuğunuzu cezalandırmak yerine, güvenilir kaynak kontrolü ve fact-checking alışkanlığı kazandırın.',
    readingTime: 6,
  },
  {
    id: '3',
    title: 'AI Bana Özel Tavsiye Verdi',
    emoji: '💊',
    ageRange: '14-15 yaş',
    category: 'güvenlik',
    difficulty: 'zor',
    situation: '14 yaşındaki çocuğunuz AI\'den sağlık tavsiyesi aldı ve uygulamaya başladı.',
    characters: ['Ebeveyn', 'Ergen Çocuk'],
    goodApproach: [
      'AI\'nin ne dediğini merakla dinleyin',
      'AI\'nin sınırlamalarını açıklayın',
      'Uzman görüşünün önemini vurgulayın',
      'Birlikte doğru kaynakları araştırın',
    ],
    avoidActions: [
      'Paniğe kapılmaktan',
      'AI\'yi "tehlikeli" olarak etiketlemekten',
      'Çocuğu aptal gibi göstermekten',
      'Konuyu kapatmaktan',
    ],
    dialogue: [
      {
        speaker: 'parent',
        text: 'Gördüm ki son günlerde diyet değiştirmişsin. Bir şey mi oldu?',
      },
      {
        speaker: 'child',
        text: 'ChatGPT\'ye sordum, bana bir beslenme planı verdi. Enerji seviyemi artıracakmış.',
        variation: 'Yok bir şey, sadece daha sağlıklı olmak istedim.',
      },
      {
        speaker: 'parent',
        text: 'Anladım, sağlığına dikkat etmen harika! Peki ChatGPT\'nin verdiği planı anlatır mısın?',
      },
      {
        speaker: 'child',
        text: 'Şunu şunu yememi, bundan uzak durmamı söyledi. Mantıklı geldi.',
      },
      {
        speaker: 'parent',
        text: 'AI çok kullanışlı bir araç gerçekten. Ama burada kritik bir nokta var: AI senin özel sağlık durumunu bilmiyor. Alerjilerin, aile geçmişin, kan değerlerin... Bunları bilmeden genel tavsiyeler veriyor.',
      },
      {
        speaker: 'child',
        text: 'E peki ne yapmalıyım?',
      },
      {
        speaker: 'parent',
        text: 'AI\'den aldığın bilgileri bir başlangıç noktası olarak kullan ama sağlıkla ilgili önemli konularda mutlaka uzmana danış. Aile doktorumuz var, istersen ona soralım. AI\'nin söyledikleri doğru mu değil mi, birlikte kontrol ederiz.',
      },
      {
        speaker: 'child',
        text: 'Tamam, mantıklı. Ben AI her şeyi bilir sanıyordum.',
      },
      {
        speaker: 'parent',
        text: 'Çok şey biliyor ama senin özel durumunu bilmiyor. Kural şu: Genel bilgi için AI tamam, ama sağlık, hukuk, finans gibi ciddi konularda mutlaka uzmana danış.',
      },
    ],
    alternativeEnding: [
      {
        speaker: 'parent',
        text: 'Ne? AI\'den sağlık tavsiyesi mi aldın? Çok tehlikeli!',
      },
      {
        speaker: 'child',
        text: 'Ama mantıklı geldi bana...',
      },
      {
        speaker: 'parent',
        text: 'AI\'ye güvenmene inanamıyorum! Hemen bırak bu diyeti!',
      },
      {
        speaker: 'child',
        text: '(Savunmada, bir daha ailesiyle sağlık konularını paylaşmayacak)',
      },
    ],
    parentReview: {
      rating: 5,
      comment: 'Çocuğum AI\'yi yasaklanmış bir şey gibi görmek yerine, doğru kullanım sınırlarını öğrendi.',
      name: 'Zeynep, doktor ve 2 çocuk annesi',
    },
    expertNote: 'AI araçları genel bilgi için harikadır ama kişiselleştirilmiş sağlık tavsiyesi veremez. Çocuklara "ne zaman uzmana danışmalıyım" kritik düşünme becerisini kazandırın.',
    readingTime: 5,
  },
  {
    id: '4',
    title: 'Gizli Bilgiler Paylaştım',
    emoji: '🔒',
    ageRange: '10-11 yaş',
    category: 'güvenlik',
    difficulty: 'kolay',
    situation: '10 yaşındaki çocuğunuz AI\'ye adres, telefon ve okul bilgilerini vermiş.',
    characters: ['Ebeveyn', 'Çocuk'],
    goodApproach: [
      'Sakin kalın ve korku yaratmadan açıklayın',
      'Hangi bilgileri paylaştığını öğrenin',
      'Dijital gizlilik kurallarını öğretin',
      '"Gizli bilgi" kavramını somut örneklerle açıklayın',
    ],
    avoidActions: [
      'Çocuğu korkutmaktan',
      'Aşırı tepki vermekten',
      'AI\'yi "kötü" olarak göstermekten',
      'Çocuğu suçlamaktan',
    ],
    dialogue: [
      {
        speaker: 'parent',
        text: 'Bugün AI ile konuşurken ne konuştunuz? Merak ettim.',
      },
      {
        speaker: 'child',
        text: 'Bana ilginç sorular sordu, ben de cevapladım. Nerede oturduğumu, hangi okula gittiğimi falan sordu.',
        variation: 'Hiç bir şey, sadece sohbet ettik.',
      },
      {
        speaker: 'parent',
        text: 'Anladım. Peki sen de ona cevap verdin mi?',
      },
      {
        speaker: 'child',
        text: 'Evet söyledim. Sorun mu?',
      },
      {
        speaker: 'parent',
        text: 'Şimdi çok önemli bir şey öğreteceğim. İnternette - AI dahil - bazı bilgilerimizi paylaşmamamız gerekir. Bunlara "gizli bilgi" diyoruz.',
      },
      {
        speaker: 'child',
        text: 'Neler gizli bilgi?',
      },
      {
        speaker: 'parent',
        text: 'Ev adresin, telefon numaran, okulunun tam adı, ne zaman evde olmadığımız... Bunlar sadece tanıdığımız, güvendiğimiz insanlarla paylaşırız. İnternette asla!',
      },
      {
        speaker: 'child',
        text: 'Ama AI bana sordu, ben de cevapladım.',
      },
      {
        speaker: 'parent',
        text: 'AI sorduğu için cevap vermeye mecbur değilsin. "Bu gizli bir bilgi, söyleyemem" diyebilirsin. AI üzülmez merak etme! 😊',
      },
      {
        speaker: 'child',
        text: 'Tamam anladım. Bundan sonra gizli bilgileri söylemeyeceğim.',
      },
    ],
    parentReview: {
      rating: 5,
      comment: 'Çocuğumu korkutmadan dijital gizlilik öğrettim. Artık hangi bilgilerin gizli olduğunu biliyor.',
      name: 'Fatma, 1 çocuk annesi',
    },
    expertNote: 'Çocuklara "gizli bilgi" kavramını somut örneklerle öğretin. Yasaklar yerine sınırlar koyun. AI kötü değildir, ama her soruyu cevaplamak zorunda değiliz.',
    readingTime: 4,
  },
  {
    id: '5',
    title: 'AI Benden Daha Akıllı',
    emoji: '😔',
    ageRange: '12-13 yaş',
    category: 'duygusal',
    difficulty: 'orta',
    situation: '12 yaşındaki çocuğunuz "AI her şeyi biliyor, ben aptalım" demeye başladı.',
    characters: ['Ebeveyn', 'Çocuk'],
    goodApproach: [
      'Duygularını onaylayın',
      'AI\'nin nasıl çalıştığını açıklayın',
      'İnsan zekası ile AI zekası arasındaki farkı gösterin',
      'Çocuğunuzun güçlü yönlerini vurgulayın',
    ],
    avoidActions: [
      '"Saçmalama, sen de akıllısın" demekten (geçersiz kılar)',
      'AI\'yi küçümsemekten',
      'Karşılaştırma yapmaktan',
      'Endişelerini görmezden gelmekten',
    ],
    dialogue: [
      {
        speaker: 'child',
        text: 'Ödevim için soru sordum, AI 5 saniyede mükemmel cevap verdi. Ben saatlerce düşünüyorum ama yapamıyorum. AI benden çok daha akıllı... 😔',
      },
      {
        speaker: 'parent',
        text: 'AI\'nin bu kadar hızlı cevap vermesi seni nasıl hissettiriyor?',
      },
      {
        speaker: 'child',
        text: 'Kendimi aptal gibi hissediyorum. Neden ben de onun gibi olamıyorum?',
        variation: 'Artık çabalamamın bir anlamı yok gibi...',
      },
      {
        speaker: 'parent',
        text: 'Duygularını anlıyorum. Şimdi bir şey soracağım: AI daha önce hiç görmediği bir problemi çözebilir mi?',
      },
      {
        speaker: 'child',
        text: 'Hmm... Bilmiyorum.',
      },
      {
        speaker: 'parent',
        text: 'Aslında hayır. AI milyarlarca örnek görerek öğreniyor. Yani daha önce görmediği bir şeyi çözemez. Ama sen farklısın - yeni problemleri, yaratıcı çözümleri, duygusal durumları anlayabilirsin.',
      },
      {
        speaker: 'child',
        text: 'Gerçekten mi?',
      },
      {
        speaker: 'parent',
        text: 'Evet! Mesela geçen hafta arkadaşın üzgündü, sen fark edip yanına gittin. AI bunu yapabilir mi? Ya da dün yaptığın resim - tamamen senin hayal gücünden çıktı. AI sadece var olan resimleri karıştırır.',
      },
      {
        speaker: 'child',
        text: 'Yani AI bazı şeylerde iyi, ben bazı şeylerde iyiyim?',
      },
      {
        speaker: 'parent',
        text: 'Kesinlikle! AI hızlı bilgi için harika bir araç. Ama yaratıcılık, empati, yeni fikirler, duygusal zeka - bunlar sadece sende var. AI senin gibi düşünemez, hissedemez, hayal kuramaz.',
      },
    ],
    parentReview: {
      rating: 5,
      comment: 'Çocuğum özgüvenini kaybediyordu. Bu konuşma sonrası AI\'yi rakip değil araç olarak görmeye başladı.',
      name: 'Ali, öğretmen ve baba',
    },
    expertNote: 'AI çağında çocukların özgüveni sarsılabilir. İnsan zekasının benzersizliğini - empati, yaratıcılık, duygusal zeka - vurgulayın. AI tamamlayıcıdır, rakip değil.',
    readingTime: 5,
  },
  {
    id: '6',
    title: 'Ödev Asistanı Kullanımı',
    emoji: '📝',
    ageRange: '10-11 yaş',
    category: 'etik',
    difficulty: 'orta',
    situation: '10 yaşındaki çocuğunuz AI\'yi ödev yaparken kullanmak istiyor ama ne kadarının uygun olduğunu bilmiyor.',
    characters: ['Ebeveyn', 'Çocuk'],
    goodApproach: [
      'AI kullanımı için birlikte kurallar oluşturun',
      'Öğrenme ile kopyalama arasındaki farkı açıklayın',
      'Doğru kullanım örnekleri verin',
      'Akademik dürüstlüğün önemini anlatın',
    ],
    avoidActions: [
      'AI\'yi tamamen yasaklamaktan',
      '"Bu hile!" demekten',
      'Çocuğu suçlamaktan',
      'Net sınırlar koymadan bırakmaktan',
    ],
    dialogue: [
      {
        speaker: 'child',
        text: 'Baba, matematik ödevim var. AI\'ye sorabilir miyim?',
      },
      {
        speaker: 'parent',
        text: 'Güzel soru! AI yardımcı olabilir ama nasıl kullandığın önemli. Ne tür yardım istiyorsun?',
      },
      {
        speaker: 'child',
        text: 'Sorunu çözmesini isteyeceğim.',
        variation: 'Nasıl yapıldığını öğrenmek istiyorum.',
      },
      {
        speaker: 'parent',
        text: 'Şimdi farkı göstereyim: AI\'ye "çöz" demek = kopyalama. AI\'ye "nasıl çözerim öğret" demek = öğrenme. Hangisi sence doğru?',
      },
      {
        speaker: 'child',
        text: 'İkincisi sanırım?',
      },
      {
        speaker: 'parent',
        text: 'Kesinlikle! Gel sana doğru kullanım yollarını göstereyim:',
      },
      {
        speaker: 'parent',
        text: '✅ İYİ: "Bu konuyu anlamadım, açıklar mısın?"\n✅ İYİ: "Örnek gösterir misin, sonra kendim çözeyim"\n✅ İYİ: "Hatamı bul ama doğrusunu söyleme, ipucu ver"',
      },
      {
        speaker: 'parent',
        text: '❌ KÖTÜ: "Şu soruyu çöz"\n❌ KÖTÜ: "Benim yerime ödev yap"\n❌ KÖTÜ: "Cevabı söyle hızlıca"',
      },
      {
        speaker: 'child',
        text: 'Anladım! Yani AI öğretmen gibi, ama benim yerime ödev yapmıyor.',
      },
      {
        speaker: 'parent',
        text: 'Tam isabet! AI senin öğrenme asistanın. Kural şu: Eğer AI olmadan aynı soruyu çözemiyorsan, öğrenmemişsin demektir. Her zaman kendin tekrar dene.',
      },
    ],
    parentReview: {
      rating: 5,
      comment: 'Çocukla birlikte "AI Ödev Kuralları" listesi oluşturduk. Artık sağlıklı kullanıyor.',
      name: 'Deniz, 2 çocuk annesi',
    },
    expertNote: 'AI tamamen yasaklamak yerine, sağlıklı kullanım kuralları geliştirin. Öğrenme sürecinde AI yardımcı olabilir, ama asla öğrenmenin kendisi olmamalı.',
    readingTime: 5,
  },
  {
    id: '7',
    title: 'Tablet Beni Tanıyor',
    emoji: '👀',
    ageRange: '6-7 yaş',
    category: 'güvenlik',
    difficulty: 'kolay',
    situation: '6 yaşındaki çocuğunuz "Tablet yüzümü tanıdı ve açıldı! Beni görüyor mu?" diye merak ediyor.',
    characters: ['Ebeveyn', 'Çocuk'],
    goodApproach: [
      'Merakını olumlu karşılayın',
      'Yüz tanıma teknolojisini basit kelimelerle açıklayın',
      'Sadece güvendiğimiz cihazlarda kullanıldığını belirtin',
      'Başkalarının cihazlarına yüz göstermemesini öğretin',
    ],
    avoidActions: [
      'Korkutarak anlatmaktan',
      'Teknik terimlerle kafasını karıştırmaktan',
      'Teknolojiden uzak tutmaya çalışmaktan',
      '"Anlamazsın" demekten',
    ],
    dialogue: [
      {
        speaker: 'child',
        text: 'Baba! Tablet sihirli! Yüzüme baktı ve açıldı! Beni tanıdı! 😮',
      },
      {
        speaker: 'parent',
        text: 'Vay be, çok ilginç değil mi? Peki sence nasıl tanıdı seni?',
      },
      {
        speaker: 'child',
        text: 'Bilmiyorum... Gözleri mi var?',
        variation: 'Belki beni hatırlıyor?',
      },
      {
        speaker: 'parent',
        text: 'Çok güzel düşünmüşsün! Aslında tabletin kamerası var, gözleri gibi. Bu kamera yüzünü hatırlıyor ve sadece senin yüzünü gördüğünde açılıyor.',
      },
      {
        speaker: 'child',
        text: 'Nasıl hatırlıyor?',
      },
      {
        speaker: 'parent',
        text: 'Şöyle düşün: Senin yüzünün bir fotoğrafı var tablet içinde. Sen yüzünü gösterince "Bu fotoğraf ile aynı, bu bizim sahibimiz!" diyor ve açılıyor.',
      },
      {
        speaker: 'child',
        text: 'Haa anladım! Tıpkı benim arkadaşlarımı tanımam gibi!',
      },
      {
        speaker: 'parent',
        text: 'Evet, biraz öyle! Ama çok önemli bir kural var: Başkalarının tabletlerine veya telefonlarına yüzünü gösterme. Sadece bizim cihazlarımıza.',
      },
      {
        speaker: 'child',
        text: 'Neden?',
      },
      {
        speaker: 'parent',
        text: 'Çünkü yüzün senin özel şifren gibi. Sadece güvendiğimiz cihazlarda olmalı. Başkasının cihazı senin yüzünü öğrenirse, bu güvenli değil.',
      },
      {
        speaker: 'child',
        text: 'Tamam baba, sadece bizim tablete yüzümü göstereceğim!',
      },
    ],
    parentReview: {
      rating: 5,
      comment: 'Çocuğum yüz tanımayı anladı ve gizlilik kuralını kavradı. Başkalarının telefonlarına dikkat ediyor artık.',
      name: 'Ahmet, 2 çocuk babası',
    },
    expertNote: 'Küçük çocuklara biometrik güvenlik kavramını basit benzetmelerle öğretin. "Yüzün özel şifrendir" yaklaşımı etkilidir. Korku yerine farkındalık yaratın.',
    readingTime: 4,
  },
  {
    id: '8',
    title: 'YouTube AI Videoları',
    emoji: '📺',
    ageRange: '8-9 yaş',
    category: 'öğrenme',
    difficulty: 'kolay',
    situation: '8 yaşındaki çocuğunuz YouTube\'da "AI yapımı" videoların bazılarının gerçek olmadığını anlamıyor.',
    characters: ['Ebeveyn', 'Çocuk'],
    goodApproach: [
      'Birlikte videolar izleyin ve analiz edin',
      'Gerçek ile AI yapımı içeriği ayırt etmeyi öğretin',
      'Kritik düşünme sorularıyla yönlendirin',
      'Güvenilir içerik üreticilerini tanıtın',
    ],
    avoidActions: [
      'YouTube\'u tamamen yasaklamaktan',
      '"Bunlar yalan" diyerek geçmekten',
      'Çocuğun merakını engellemekten',
      'Tek başına izlemesine izin vermekten',
    ],
    dialogue: [
      {
        speaker: 'child',
        text: 'Anne, YouTube\'da bir video gördüm! AI dinozor yapıyormuş ve gerçek gibi yürüyordu! 🦕',
      },
      {
        speaker: 'parent',
        text: 'Vay, çok ilginç! Göster bakalım o videoyu. Birlikte izleyelim.',
      },
      {
        speaker: 'child',
        text: 'İşte bu! Bak, dinozor hareket ediyor! Gerçek mi bu?',
        variation: 'Çok gerçekçi görünüyor, nasıl yapmışlar?',
      },
      {
        speaker: 'parent',
        text: 'Çok ilginç bir video. Şimdi birlikte kontrol edelim: Bu gerçek bir dinozor mu, yoksa AI ile yapılmış bir görüntü mü?',
      },
      {
        speaker: 'child',
        text: 'Bilmiyorum... Nasıl anlarız?',
      },
      {
        speaker: 'parent',
        text: 'Şu sorulara cevap arayalım: 1) Dinozorlar bugün var mı? 2) Video açıklamasında ne yazıyor? 3) Bu kanal güvenilir mi?',
      },
      {
        speaker: 'child',
        text: 'Dinozorlar yok artık... ve açıklamada "AI animasyon" yazıyor! Demek ki gerçek değil!',
      },
      {
        speaker: 'parent',
        text: 'Aferin! Harika tespit! AI çok gerçekçi görüntüler yapabiliyor ama bunlar gerçek değil. Tıpkı çizgi filmlerdeki karakterler gibi.',
      },
      {
        speaker: 'child',
        text: 'Peki hangi videolar gerçek?',
      },
      {
        speaker: 'parent',
        text: 'Güzel soru! Bundan sonra bir video izlediğinde şunları kontrol et: Açıklamaya bak, kanalın diğer videolarına bak, gerçekçi olup olmadığını düşün. Eğer emin değilsen bana sor.',
      },
      {
        speaker: 'child',
        text: 'Tamam anne! Artık videolara daha dikkatli bakacağım! 👀',
      },
    ],
    parentReview: {
      rating: 5,
      comment: 'Çocuğumla birlikte video analiz etmeyi öğrendik. Artık her gördüğüne inanmıyor, sorguluyor.',
      name: 'Selin, 3 çocuk annesi',
    },
    expertNote: 'Dijital medya okuryazarlığını erken yaşta öğretin. Yasaklar yerine, çocuğunuzla birlikte içerik tüketin ve kritik düşünme becerisi kazandırın.',
    readingTime: 4,
  },
];

const CATEGORIES = [
  { id: 'all', label: 'Tümü', emoji: '📚', color: '#9B59B6' },
  { id: 'güvenlik', label: 'Güvenlik', emoji: '🔒', color: '#E74C3C' },
  { id: 'etik', label: 'Etik', emoji: '⚖️', color: '#3498DB' },
  { id: 'bağımlılık', label: 'Bağımlılık', emoji: '📱', color: '#E67E22' },
  { id: 'öğrenme', label: 'Öğrenme', emoji: '📝', color: '#2ECC71' },
  { id: 'duygusal', label: 'Duygusal', emoji: '💭', color: '#9B59B6' },
];

const AGE_FILTERS = [
  { id: 'all', label: 'Tüm Yaşlar' },
  { id: '6-7', label: '6-7 yaş' },
  { id: '8-9', label: '8-9 yaş' },
  { id: '10-11', label: '10-11 yaş' },
  { id: '12-13', label: '12-13 yaş' },
  { id: '14-15', label: '14-15 yaş' },
];

const DIFFICULTY_FILTERS = [
  { id: 'all', label: 'Tüm Zorluklar' },
  { id: 'kolay', label: 'Kolay', emoji: '⭐' },
  { id: 'orta', label: 'Orta', emoji: '⭐⭐' },
  { id: 'zor', label: 'Zor', emoji: '⭐⭐⭐' },
];

const ScenarioLibraryScreen: React.FC = () => {
  const navigation = useNavigation();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [showGoodDialogue, setShowGoodDialogue] = useState(true);

  const filteredScenarios = SCENARIOS.filter((scenario) => {
    const categoryMatch = selectedCategory === 'all' || scenario.category === selectedCategory;
    const ageMatch = selectedAge === 'all' || scenario.ageRange.includes(selectedAge);
    const difficultyMatch = selectedDifficulty === 'all' || scenario.difficulty === selectedDifficulty;
    return categoryMatch && ageMatch && difficultyMatch;
  });

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating);
  };

  const getDifficultyStars = (difficulty: string) => {
    switch (difficulty) {
      case 'kolay': return '⭐';
      case 'orta': return '⭐⭐';
      case 'zor': return '⭐⭐⭐';
      default: return '⭐';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>📚 Senaryo Kütüphanesi</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Intro */}
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>Gerçek Hayattan Senaryolar</Text>
          <Text style={styles.introText}>
            Yaşa, konuya ve zorluğa göre filtrelenmiş diyalog senaryoları ile gerçek durumlar için hazırlıklı olun.
          </Text>
        </View>

        {/* Category Filters */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Kategori</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.filterChip,
                  selectedCategory === cat.id && { backgroundColor: cat.color },
                ]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Text style={styles.filterChipEmoji}>{cat.emoji}</Text>
                <Text
                  style={[
                    styles.filterChipText,
                    selectedCategory === cat.id && styles.filterChipTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Age Filters */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Yaş Grubu</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {AGE_FILTERS.map((age) => (
              <TouchableOpacity
                key={age.id}
                style={[
                  styles.filterButton,
                  selectedAge === age.id && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedAge(age.id)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedAge === age.id && styles.filterButtonTextActive,
                  ]}
                >
                  {age.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Difficulty Filters */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Zorluk</Text>
          <View style={styles.filterRow}>
            {DIFFICULTY_FILTERS.map((diff) => (
              <TouchableOpacity
                key={diff.id}
                style={[
                  styles.filterButton,
                  selectedDifficulty === diff.id && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedDifficulty(diff.id)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedDifficulty === diff.id && styles.filterButtonTextActive,
                  ]}
                >
                  {diff.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Scenario Cards */}
        <View style={styles.scenariosSection}>
          <Text style={styles.sectionTitle}>
            {filteredScenarios.length} Senaryo Bulundu
          </Text>

          {filteredScenarios.map((scenario) => {
            const categoryInfo = CATEGORIES.find((c) => c.id === scenario.category);
            return (
              <TouchableOpacity
                key={scenario.id}
                style={[styles.scenarioCard, { borderLeftColor: categoryInfo?.color }]}
                onPress={() => setSelectedScenario(scenario)}
                activeOpacity={0.8}
              >
                <View style={styles.scenarioCardHeader}>
                  <Text style={styles.scenarioEmoji}>{scenario.emoji}</Text>
                  <View style={styles.scenarioCardInfo}>
                    <Text style={styles.scenarioTitle}>{scenario.title}</Text>
                    <View style={styles.scenarioMeta}>
                      <Text style={styles.scenarioMetaText}>{scenario.ageRange}</Text>
                      <Text style={styles.scenarioMetaText}>•</Text>
                      <Text style={styles.scenarioMetaText}>{getDifficultyStars(scenario.difficulty)}</Text>
                      <Text style={styles.scenarioMetaText}>•</Text>
                      <Text style={styles.scenarioMetaText}>{scenario.readingTime} dk</Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.scenarioSituation} numberOfLines={2}>
                  {scenario.situation}
                </Text>

                <View style={styles.scenarioFooter}>
                  <View style={styles.scenarioRating}>
                    <Text style={styles.scenarioRatingText}>
                      {renderStars(scenario.parentReview.rating)}
                    </Text>
                    <Text style={styles.scenarioRatingCount}>
                      {scenario.parentReview.name}
                    </Text>
                  </View>
                  <Text style={styles.scenarioReadMore}>Detayları Gör →</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Scenario Detail Modal */}
      <Modal
        visible={selectedScenario !== null}
        animationType="slide"
        onRequestClose={() => setSelectedScenario(null)}
      >
        {selectedScenario && (
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => setSelectedScenario(null)}
                style={styles.modalBackButton}
              >
                <Text style={styles.modalBackButtonText}>←</Text>
              </TouchableOpacity>
              <Text style={styles.modalHeaderTitle}>Senaryo Detayı</Text>
              <View style={styles.placeholder} />
            </View>

            <ScrollView
              style={styles.modalContent}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{ paddingBottom: 40 }}
              bounces={true}
            >
              {/* Scenario Title */}
              <View style={styles.modalTitleSection}>
                <Text style={styles.modalEmoji}>{selectedScenario.emoji}</Text>
                <Text style={styles.modalTitle}>{selectedScenario.title}</Text>
                <Text style={styles.modalSituation}>{selectedScenario.situation}</Text>
              </View>

              {/* Characters */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>👥 Karakterler</Text>
                <Text style={styles.modalSectionText}>
                  {selectedScenario.characters.join(', ')}
                </Text>
              </View>

              {/* Good Approach */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>✅ Doğru Yaklaşım</Text>
                {selectedScenario.goodApproach.map((step, index) => (
                  <Text key={index} style={styles.modalListItem}>
                    {index + 1}. {step}
                  </Text>
                ))}
              </View>

              {/* Avoid Actions */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>❌ Bunlardan Kaçının</Text>
                {selectedScenario.avoidActions.map((action, index) => (
                  <Text key={index} style={styles.modalListItem}>
                    • {action}
                  </Text>
                ))}
              </View>

              {/* Dialogue Tabs */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>💬 Örnek Diyalog</Text>

                <View style={styles.dialogueTabs}>
                  <TouchableOpacity
                    style={[
                      styles.dialogueTab,
                      showGoodDialogue && styles.dialogueTabActive,
                    ]}
                    onPress={() => setShowGoodDialogue(true)}
                  >
                    <Text
                      style={[
                        styles.dialogueTabText,
                        showGoodDialogue && styles.dialogueTabTextActive,
                      ]}
                    >
                      ✅ İyi Yaklaşım
                    </Text>
                  </TouchableOpacity>

                  {selectedScenario.alternativeEnding && (
                    <TouchableOpacity
                      style={[
                        styles.dialogueTab,
                        !showGoodDialogue && styles.dialogueTabActive,
                      ]}
                      onPress={() => setShowGoodDialogue(false)}
                    >
                      <Text
                        style={[
                          styles.dialogueTabText,
                          !showGoodDialogue && styles.dialogueTabTextActive,
                        ]}
                      >
                        ❌ Kötü Yaklaşım
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Dialogue Bubbles */}
                <View style={styles.dialogueContainer}>
                  {(showGoodDialogue
                    ? selectedScenario.dialogue
                    : selectedScenario.alternativeEnding || []
                  ).map((exchange, index) => (
                    <View key={index}>
                      <View
                        style={[
                          styles.dialogueBubble,
                          exchange.speaker === 'parent'
                            ? styles.dialogueBubbleParent
                            : styles.dialogueBubbleChild,
                        ]}
                      >
                        <Text style={styles.dialogueSpeaker}>
                          {exchange.speaker === 'parent' ? '👨‍👩‍👧 Ebeveyn' : '👦 Çocuk'}
                        </Text>
                        <Text style={styles.dialogueText}>{exchange.text}</Text>

                        {exchange.variation && (
                          <View style={styles.variationBox}>
                            <Text style={styles.variationLabel}>🔄 Alternatif Tepki:</Text>
                            <Text style={styles.variationText}>{exchange.variation}</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              {/* Parent Review */}
              <View style={[styles.modalSection, styles.reviewSection]}>
                <Text style={styles.modalSectionTitle}>⭐ Ebeveyn Yorumu</Text>
                <Text style={styles.reviewStars}>
                  {renderStars(selectedScenario.parentReview.rating)}
                </Text>
                <Text style={styles.reviewComment}>"{selectedScenario.parentReview.comment}"</Text>
                <Text style={styles.reviewName}>- {selectedScenario.parentReview.name}</Text>
              </View>

              {/* Expert Note */}
              <View style={[styles.modalSection, styles.expertSection]}>
                <Text style={styles.modalSectionTitle}>👩‍🏫 Uzman Notu</Text>
                <Text style={styles.expertText}>{selectedScenario.expertNote}</Text>
              </View>
            </ScrollView>
          </View>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#9B59B6',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  introCard: {
    backgroundColor: '#F3E5F5',
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#9B59B6',
  },
  introTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A1B9A',
    marginBottom: 8,
  },
  introText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
  filterSection: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterChipEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  filterChipText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#9B59B6',
    borderColor: '#9B59B6',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  scenariosSection: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  scenarioCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  scenarioCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  scenarioEmoji: {
    fontSize: 40,
    marginRight: 12,
  },
  scenarioCardInfo: {
    flex: 1,
  },
  scenarioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  scenarioMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scenarioMetaText: {
    fontSize: 12,
    color: '#999999',
  },
  scenarioSituation: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  scenarioFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  scenarioRating: {
    flexDirection: 'column',
  },
  scenarioRatingText: {
    fontSize: 14,
    marginBottom: 2,
  },
  scenarioRatingCount: {
    fontSize: 11,
    color: '#999999',
  },
  scenarioReadMore: {
    fontSize: 14,
    color: '#9B59B6',
    fontWeight: 'bold',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#9B59B6',
  },
  modalBackButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackButtonText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalContent: {
    flex: 1,
  },
  modalTitleSection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#F3E5F5',
  },
  modalEmoji: {
    fontSize: 60,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 12,
  },
  modalSituation: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
  },
  modalSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  modalSectionText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  modalListItem: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
    marginBottom: 6,
  },
  dialogueTabs: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  dialogueTab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  dialogueTabActive: {
    backgroundColor: '#9B59B6',
  },
  dialogueTabText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  dialogueTabTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  dialogueContainer: {
    gap: 12,
  },
  dialogueBubble: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  dialogueBubbleParent: {
    backgroundColor: '#E3F2FD',
    alignSelf: 'flex-start',
    maxWidth: '85%',
  },
  dialogueBubbleChild: {
    backgroundColor: '#FFF9C4',
    alignSelf: 'flex-end',
    maxWidth: '85%',
  },
  dialogueSpeaker: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555555',
    marginBottom: 6,
  },
  dialogueText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  variationBox: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  variationLabel: {
    fontSize: 11,
    color: '#9B59B6',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  variationText: {
    fontSize: 13,
    color: '#555555',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  reviewSection: {
    backgroundColor: '#FFF9E5',
  },
  reviewStars: {
    fontSize: 18,
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: 14,
    color: '#333333',
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewName: {
    fontSize: 13,
    color: '#666666',
    fontWeight: 'bold',
  },
  expertSection: {
    backgroundColor: '#E8F5E9',
  },
  expertText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 22,
  },
});

export default ScenarioLibraryScreen;
