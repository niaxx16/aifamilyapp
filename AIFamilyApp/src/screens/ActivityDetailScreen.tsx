import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput, Image } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Activity, ActivityStep, ActivityObservation, ActivityMaterial } from '../types/database.types';
import { supabase } from '../services/supabase';
import { checkAndAwardPointBadges } from '../utils/badgeUtils';

type ActivityDetailRouteProp = RouteProp<
  { ActivityDetail: { activity: Activity; child: any } },
  'ActivityDetail'
>;

interface Props {
  route: ActivityDetailRouteProp;
}

// Hafta bilgileri - Yaş gruplarına göre
interface WeekInfo {
  title: string;
  description: string;
}

const WEEK_INFO: { [ageGroup: string]: { [week: number]: WeekInfo } } = {
  // 6-7 Yaş Grubu
  '6-7': {
    1: {
      title: '"Akıllı" Makineleri Tanıyoruz',
      description: 'Bu hafta, çocuğunuzun teknolojiye olan doğal merakını bir keşif oyununa dönüştürerek yapay zekanın ne olduğuna dair ilk tohumları atacağız. Amaç, teknik bilgi vermek değil, farkındalık ve merak uyandırmaktır.',
    },
    2: {
      title: 'Veri ve Bilgi Toplama',
      description: 'Yapay zekanın öğrenebilmesi için bilgiye, yani veriye ihtiyacı vardır. Bu hafta, çocuğunuzla birlikte bir "veri dedektifi" olacak ve etrafımızdaki dünyadan nasıl bilgi topladığımızı ve bu bilgileri nasıl anlamlı hale getirdiğimizi göreceğiz.',
    },
    3: {
      title: 'Desenleri ve Kuralları Keşfetme',
      description: 'İlk iki haftada "akıllı" makineleri ve onların işlediği "veri"yi tanıdık. Bu hafta ise yapay zekanın bu verilerdeki tekrarlayan desenleri ve gizli kuralları nasıl bulduğunu keşfedeceğiz. Bu, YZ\'nin tahmin yürütme ve karar verme yeteneğinin temelidir.',
    },
    4: {
      title: 'Makineler Nasıl Öğrenir?',
      description: 'Önceki haftalarda "veri" topladık ve "desenleri" keşfettik. Bu hafta ise yapay zekanın bu verileri ve desenleri kullanarak tıpkı bir çocuk gibi nasıl "öğrendiğini" canlandıracağız. Bu hafta üç farklı öğrenme biçimini üç farklı oyun türüyle deneyimleyeceğiz.',
    },
    5: {
      title: 'Yapay Zeka ile Etkileşim: Sesli Asistanlar',
      description: 'Daha önceki haftalarda yapay zekanın nasıl veri işlediğini, desenleri nasıl tanıdığını ve nasıl öğrendiğini oyunlarla canlandırdık. Bu hafta, öğrendiğimiz her şeyin bir araya geldiği, evimizdeki "akıllı" yardımcılarla tanışma ve onlarla konuşma zamanı!',
    },
    6: {
      title: 'Yapay Zeka ve Görsel Tanıma',
      description: 'Bu hafta, "Görmek" eyleminin makineler için ne anlama geldiğini keşfedeceğiz. "Bilgisayarların gözü var mı?", "Resimlere bakınca ne anlıyorlar?" gibi soruların cevaplarını eğlenceli ve etkileşimli deneylerle bulacağız.',
    },
    7: {
      title: 'Öneri Sistemleri',
      description: 'Bu hafta, "YouTube benim sevdiğim çizgi filmi nereden biliyor?" veya "Spotify neden tam benim sevdiğim gibi bir şarkı açtı?" sorularının peşine düşeceğiz. Yapay zekanın bizi tanıyan bir "arkadaş" gibi davranmaya çalıştığını keşfedeceğiz.',
    },
    8: {
      title: 'Yapay Zeka ve Oyun',
      description: 'Bu hafta, çocukların en sevdiği aktivite olan "Oyun" üzerinden yapay zekayı inceleyeceğiz. Bilgisayar rakibinin nasıl strateji kurduğunu, oyun kurallarının nasıl çalıştığını ve kodlamanın temellerini öğreneceğiz.',
    },
  },
  // 8-9 Yaş Grubu
  '8-9': {
    1: {
      title: 'Zeka mı, Kural mı? (Temel Kavramlar)',
      description: 'Bu hafta, "otomasyon" ile "yapay zeka" arasındaki farkı keşfedeceğiz. Hangi makineler sadece kurallara uyuyor, hangileri gerçekten "düşünüyor"? Turing Testi ile insan-makine farkını deneyimleyeceğiz.',
    },
    2: {
      title: 'Bilgisayarlar Nasıl Görür? (Pikseller ve Veri)',
      description: 'Bu hafta, bilgisayarların görüntüleri nasıl gördüğünü ve işlediğini keşfedeceğiz. Pikseller, desen tanıma ve veri tabanları ile yapay zekanın görsel dünyayı nasıl anlamlandırdığını öğreneceğiz.',
    },
  },
};

// Zengin etkinlik içeriği yapısı
interface ActivityContent {
  type: string;
  materials: { item: string; optional?: boolean }[];
  purpose: string;
  steps: { step: number; title: string; description: string }[];
  observations: { title: string; description: string }[];
}

const ACTIVITY_CONTENT: { [key: string]: ActivityContent } = {
  'Akıllı Cihaz Avı': {
    type: 'Gözlem ve Sohbet',
    materials: [
      { item: 'Evde bulunan akıllı cihazlar (akıllı telefon, tablet, akıllı TV, sesli asistan/akıllı hoparlör, akıllı saat, robot süpürge vb.)' },
      { item: 'Kartondan yapılmış bir "kaşif dürbünü" veya bir şapka', optional: true },
    ],
    purpose: 'Çocuğun günlük hayatta kullandığı bazı cihazların diğerlerinden farklı ve "akıllı" olduğunu fark etmesini sağlamak. Bu cihazların neden "akıllı" olarak adlandırıldığı üzerine basit bir diyalog başlatmak.',
    steps: [
      { step: 1, title: 'Oyunu Başlatın', description: 'Çocuğunuza "Bugün evimizde saklanan \'akıllı\' eşyaları bulacağımız heyecanlı bir avcılık oyunu oynayacağız! Sen bir kaşifsin ve görevin bu akıllı cihazları bulmak. İşte dürbünün!" diyerek oyunu başlatın.' },
      { step: 2, title: 'İlk İpucunu Verin', description: 'En belirgin cihazla başlayın, örneğin akıllı telefon. "Ben bir cihazım, hem konuşabilirsin hem oyun oynayabilirsin, babanla görüntülü konuşmanı sağlarım. Bil bakalım ben neyim?"' },
      { step: 3, title: '"Akıllı" Kelimesini Sorgulayın', description: 'Çocuk cihazı bulduğunda onu tebrik edin ve şu soruyu sorun: "Sence bu telefon neden \'akıllı\' olabilir? Onu diğer eşyalardan farklı yapan ne?" Cevapları için onu cesaretlendirin. "Evet, çünkü bizimle konuşuyor", "Çünkü dokununca anlıyor" gibi cevaplar harikadır.' },
      { step: 4, title: 'Diğer Cihazları Keşfedin', description: 'Sesli asistana "Bize bir hayvan sesi taklidi yap" diyerek, akıllı TV\'ye sesli komutla çizgi film açtırarak diğer cihazları da ava dahil edin. Her cihaz bulunduğunda, "Bu aletin hangi özelliği onu akıllı yapıyor?" sorusunu tekrarlayın.' },
      { step: 5, title: 'Sohbeti Basit Tutun', description: 'Teknik detaylara girmeyin. "Sanki içinde komutlarımızı anlayan küçük bir beyni var gibi, değil mi?", "İnternete bağlanıp bize bilgi getiriyor" gibi basit ve somut açıklamalar kullanın.' },
      { step: 6, title: 'Avı Tamamlayın', description: 'Bulduğunuz tüm "akıllı" cihazları göstererek, "Vay canına! Evimizde ne kadar çok akıllı yardımcımız varmış. Bunlar hayatımızı kolaylaştırıyor," diyerek etkinliği olumlu bir şekilde sonlandırın.' },
    ],
    observations: [
      { title: 'Gözlem ve Sınıflandırma', description: 'Çocuğun normal bir saat ile akıllı saat, sıradan bir hoparlör ile akıllı hoparlör arasındaki farkı sezebilmesi.' },
      { title: 'Mantık Yürütme', description: 'Bir cihaza neden "akıllı" dendiğine dair basit de olsa bir sebep sunabilmesi ("Çünkü soruma cevap veriyor").' },
      { title: 'Sözlü İfade', description: 'Düşüncelerini ve gözlemlerini kelimelere dökme becerisi.' },
      { title: 'Merak ve Soru Sorma', description: '"Bu nasıl çalışıyor?", "Nereden biliyor?" gibi sorular sorması.' },
    ],
  },
  'Robot Arkadaşım': {
    type: 'Yaratıcı Drama ve Rol Yapma',
    materials: [
      { item: 'Sadece hayal gücü!' },
      { item: 'Alüminyum folyodan komik bir robot şapkası', optional: true },
    ],
    purpose: 'Bir makineye veya robota talimat vermenin ne demek olduğunu fiziksel olarak deneyimlemek. Komutların net ve adım adım olması gerektiği fikrini (algoritmanın temel mantığı) oyun yoluyla somutlaştırmak.',
    steps: [
      { step: 1, title: 'Rolleri Dağıtın', description: '"Şimdi çok eğlenceli bir oyun oynayacağız. Ben komutlarla çalışan bir robot olacağım. Sen de benim programcım olacaksın ve bana ne yapmam gerektiğini söyleyeceksin. Unutma, ben komut almadan hiçbir şey yapamam!" deyin. Komik, mekanik sesler ve hareketlerle role girin.' },
      { step: 2, title: 'İlk Komutu Alın', description: 'Çocuğunuzdan basit bir görev isteyin. Örneğin, "Beni odanın diğer ucundaki oyuncağa götür."' },
      { step: 3, title: 'Komutları Birebir Uygulayın', description: 'Eğer çocuğunuz "Oyuncağa git" derse, sadece oyuncağa dönün ama hareket etmeyin. Bu, komutun eksik olduğunu anlamasına yardımcı olur. Ona "HATA! HATA! NASIL GİDECEĞİMİ SÖYLEMEDİN. ADIM ADIM KOMUT GEREKİYOR." gibi robotik bir sesle geri bildirim verin.' },
      { step: 4, title: 'Adım Adım Düşünmeye Teşvik Edin', description: 'Onu daha detaylı komutlar vermesi için yönlendirin: "3 adım ileri git. Şimdi sağa dön. 2 adım daha ileri git." Her komutu abartılı robot hareketleriyle birebir uygulayın.' },
      { step: 5, title: 'Rolleri Değişin', description: 'Birkaç görevden sonra rolleri değişin. Bu kez çocuk robot olsun, siz programcı olun. Bu, onun bir komutun neden net olması gerektiğini tam olarak anlamasını sağlar. Ona "Zıpla", "Olduğun yerde 3 kere dön" gibi basit komutlar verin.' },
      { step: 6, title: 'Oyunun Özünü Konuşun', description: 'Oyun bittikten sonra, "Gördün mü, robotlar bizim gibi düşünemez. Onlara her şeyi en küçük ayrıntısına kadar söylememiz gerekir. Tıpkı senin bana yaptığın gibi!" diyerek ana fikri özetleyin.' },
    ],
    observations: [
      { title: 'Algoritmik Düşünme', description: 'Büyük bir görevi (oyuncağa ulaşmak) daha küçük adımlara (ileri git, dön) ayırma becerisi.' },
      { title: 'Problem Çözme', description: 'Verdiği ilk komut işe yaramadığında, daha net ve farklı bir komut denemesi.' },
      { title: 'Empati ve Perspektif Alma', description: '"Robot" rolündeyken komutların neden açık olması gerektiğini deneyimleyerek anlaması.' },
      { title: 'İletişim Netliği', description: 'Düşündüğü eylemi, karşı tarafın anlayacağı şekilde açık ve sıralı bir dille ifade etme çabası.' },
    ],
  },
  'Yapay Zeka Nedir?': {
    type: 'Hikaye Anlatımı ve Somutlaştırma',
    materials: [
      { item: 'Çocuğun çok sevdiği bir oyuncak (pelüş hayvan, bebek, araba vb.)' },
    ],
    purpose: '"Yapay zeka" gibi soyut bir kavramı, çocuğun anlayabileceği basit, sihirli ve akılda kalıcı bir analoji (benzetme) ile tanıştırmak.',
    steps: [
      { step: 1, title: 'Sohbeti Başlatın', description: 'Çocuğunuzun en sevdiği oyuncağı elinize alın ve "Ayıcık Polat ne kadar sevimli değil mi? Peki sence o kendi kendine düşünebilir mi? Ya da en sevdiğin yemeğin makarna olduğunu öğrenebilir mi?" diye sorun. Cevabı muhtemelen "Hayır" olacaktır.' },
      { step: 2, title: 'Sihirli Analojiyi Sunun', description: '"Şimdi hayal edelim," deyin. "Elimizde görünmez, sihirli bir \'öğrenme tozu\' var. Bu tozu Ayıcık Polat\'ın kafasından içeri üflüyoruz. Föööö! Artık bu sihirli toz sayesinde Polat, senin en sevdiğin rengin mavi olduğunu öğrenebiliyor ve sen üzgün olduğunda bunu anlayabiliyor."' },
      { step: 3, title: 'Yapay Zekaya Bağlayın', description: '"İşte yapay zeka da bu sihirli \'öğrenme tozu\' gibi bir şey. Gerçek değil ama bilgisayarların, telefonların ve robotların içine konulan çok akıllı bir program. Bu program, makinelerin de tıpkı insanlar gibi yeni şeyler öğrenmesini, karar vermesini ve bize yardım etmesini sağlıyor."' },
      { step: 4, title: 'Önceki Etkinliklerle Bağlantı Kurun', description: '"Hani biraz önce akıllı telefonu bulmuştuk ya? İşte onun içindeki yapay zeka, senin sesini tanımayı \'öğrenmiş\'. Ya da robot oyunumuzda sen bana komut verince ben yapıyordum ya, gerçek robotların içindeki yapay zeka da komutları anlamayı \'öğreniyor\'."' },
      { step: 5, title: 'Basit ve Pozitif Kapanış', description: 'Konuyu çok uzatmadan, "Yani yapay zeka, makinelerin daha akıllı ve daha yardımsever olmasını sağlayan sihirli bir beyin gibidir. Ama o bir bilgisayar programı, bizimki gibi gerçek bir beyin değil," diyerek özetleyin ve merak ettiği soruları cevaplayın.' },
    ],
    observations: [
      { title: 'Soyut Düşünme', description: 'Gözle görülmeyen bir kavramı (yapay zeka), bir analoji (sihirli toz) üzerinden anlama becerisi.' },
      { title: 'Bağlantı Kurma', description: 'Yeni öğrendiği bu soyut kavramı, ilk etkinlikte gördüğü somut cihazlarla ilişkilendirebilmesi.' },
      { title: 'Hayal Gücü', description: 'Oyuncağının "öğrenebildiği" fikriyle eğlenmesi ve bu hayali oyuna katılması.' },
      { title: 'Dinlediğini Anlama', description: 'Yapay zekanın ne olduğuna dair sorulduğunda "makinelerin beyni" veya "öğrenme tozu" gibi kendi cümleleriyle basit bir açıklama yapabilmesi.' },
    ],
  },
  'Renk Gruplama Oyunu': {
    type: 'Sınıflandırma ve Kategorizasyon',
    materials: [
      { item: 'Farklı renklerde küçük nesneler (Legolar, renkli ponponlar, düğmeler, makarnalar veya renkli çoraplar)' },
      { item: 'Nesneleri gruplamak için renkli kağıtlar, kaseler veya yere tebeşirle çizilmiş daireler' },
    ],
    purpose: 'Nesneleri özelliklerine (renklerine) göre ayırmanın, yapay zekanın "veriyi" nasıl işlediğini ve sınıflandırdığını anlamak için ilk ve en temel adımı atmak.',
    steps: [
      { step: 1, title: 'Hazırlık ve Hikaye', description: 'Tüm renkli nesneleri ortaya karıştırın. Çocuğunuza, "Bak buradaki bütün renkler birbirine karışmış ve evlerini kaybetmişler! Onlara yardım edip renklerine göre kendi evlerine yerleştirelim mi? Sen bir \'Renk Ayırma Robotu\' olacaksın!" diyerek oyunu başlatın.' },
      { step: 2, title: 'Görevi Verin', description: '"Robotcuğum, görevin bütün kırmızıları bu kırmızı kağıdın üzerine, bütün mavileri de bu mavi kasenin içine koymak." diyerek net bir talimat verin.' },
      { step: 3, title: 'Sınıflandırma Anı', description: 'Çocuğunuz nesneleri ayırırken onu gözlemleyin ve teşvik edin. "Harika! Bütün sarıları bir araya topladın. Şimdi sarı renk bilgisi tek bir yerde." gibi ifadelerle yaptığı işi "bilgi gruplama" olarak adlandırın.' },
      { step: 4, title: 'Kavramı Yapay Zekaya Bağlayın', description: 'Etkinlik bittiğinde, "İşte başardın! Tıpkı senin yaptığın gibi, yapay zeka da bir sürü bilgiyi (veriyi) alır ve onları özelliklerine göre gruplara ayırır. Mesela internette kedi fotoğraflarını aradığında, yapay zeka milyonlarca fotoğraf arasından sadece kedilerin olduğu fotoğrafları bulup senin önüne getirir. Çünkü o, kedi fotoğraflarını diğerlerinden ayırmayı öğrenmiştir."' },
      { step: 5, title: 'İkinci Seviye', description: 'Eğer çocuğunuzun ilgisi devam ederse, "Şimdi de şekillerine göre ayıralım mı? Bütün yuvarlaklar bir yere, bütün köşeliler bir yere!" diyerek sınıflandırmanın tek bir özellikle sınırlı olmadığını gösterebilirsiniz.' },
    ],
    observations: [
      { title: 'Sınıflandırma Becerisi', description: 'Nesneleri belirli bir kurala (renk, şekil) göre tutarlı bir şekilde ayırabilmesi.' },
      { title: 'Dikkat ve Odaklanma', description: 'Karışık bir grup içinden istenen özelliğe sahip nesneleri seçip görevi tamamlama süresi.' },
      { title: 'Problem Çözme', description: 'Elindeki nesnenin hangi gruba ait olduğuna karar verme süreci.' },
      { title: 'Kavram Geliştirme', description: '"Grup", "ayırma", "benzer", "farklı" gibi kavramları anlaması ve kullanması.' },
    ],
  },
  'Duygu Kartları': {
    type: 'Veri Toplama ve Desen Tanıma',
    materials: [
      { item: 'Üzerine mutlu, üzgün, şaşkın ve kızgın yüz ifadeleri çizilmiş küçük kartlar veya kağıtlar' },
      { item: 'Ayna', optional: true },
    ],
    purpose: 'Yüz ifadeleri gibi soyut kavramların da birer "bilgi" (veri) olduğunu ve makinelerin bu görsel verileri tanımak için eğitilebileceğini eğlenceli bir yolla göstermek.',
    steps: [
      { step: 1, title: 'Kartları Tanıtın', description: 'Çizdiğiniz duygu kartlarını gösterin. "Bak bu kartlarda farklı duygular var. Sence bu yüz ne hissediyor?" diyerek her bir kart hakkında konuşun.' },
      { step: 2, title: 'Taklit ve Tahmin Oyunu', description: '"Şimdi bir oyun oynayalım. Ben bu kartlardan birini seçeceğim ve sana göstermeden o yüzü taklit edeceğim. Sen de hangi duygu olduğunu tahmin etmeye çalış." Mutlu bir yüz yapın ve çocuğunuzun "mutlu" kartını göstermesini bekleyin.' },
      { step: 3, title: 'Rolleri Değişin', description: '"Sıra sende! Sen bir yüz yap, ben tahmin edeyim." Ayna kullanarak kendi yüz ifadesini görmesi, çocuğun duyguları daha iyi anlamasına yardımcı olabilir.' },
      { step: 4, title: 'Yapay Zekaya Bağlantı Kurun', description: '"Ne kadar harika bir iş çıkardın! Sen bir insanın yüzüne bakıp onun mutlu mu üzgün mü olduğunu hemen anlıyorsun. Bazı akıllı telefonların kameraları da bunu yapabiliyor biliyor musun? İçlerindeki yapay zeka, binlerce mutlu ve üzgün insan fotoğrafına bakarak bu yüzlerin nasıl göründüğünü \'öğreniyor\'. Sonra yeni bir fotoğraf gördüğünde, \'Hımm, bu yüz benim öğrendiğim mutlu yüzlere benziyor\' diyerek tahmin ediyor. Tıpkı senin yaptığın gibi!"' },
    ],
    observations: [
      { title: 'Duygusal Zeka', description: 'Temel duyguları tanıması ve isimlendirmesi.' },
      { title: 'Gözlem ve Eşleştirme', description: 'Gördüğü bir yüz ifadesini, ilgili çizimle eşleştirebilmesi.' },
      { title: 'Empati', description: 'Farklı duyguların yüzümüze nasıl yansıdığını anlaması.' },
      { title: 'Soyutlama', description: 'Bir çizimin gerçek bir duyguyu temsil ettiğini kavraması.' },
    ],
  },
  'Benim Verilerim': {
    type: 'Sanat Etkinliği ve Kendini İfade Etme',
    materials: [
      { item: 'Büyük bir kağıt veya karton' },
      { item: 'Boya kalemleri, keçeli kalemler' },
      { item: 'Yapıştırıcı, dergilerden kesilmiş resimler', optional: true },
    ],
    purpose: 'Çocuğun kendine ait özelliklerin (sevdiği renk, yemek, oyuncak vb.) de birer "veri" olduğunu ve bu verilerin onu eşsiz kıldığını anlamasını sağlamak. "Kişisel veri" kavramına güvenli bir giriş yapmak.',
    steps: [
      { step: 1, title: 'Projeyi Tanıtın', description: '"Bugün senin hakkında her şeyi anlatan süper bir poster yapacağız! Bu postere \'[Çocuğun Adı]\'nın Veri Dünyası\' adını verelim. Bilgisayar dilinde, bir kişi hakkındaki bilgilere \'veri\' denir. Gel senin verilerini resimlerle anlatalım!"' },
      { step: 2, title: 'Veri Toplamaya Başlayın', description: 'Kağıdın ortasına çocuğunuzun bir resmini yapıştırın veya birlikte çizin. Sonra sorular sorun: "En sevdiğin yemek nedir?", "En sevdiğin renk hangisi?", "En çok oynamayı sevdiğin oyuncak hangisi?", "En sevdiğin hayvan hangisi?" Her cevabı resimle posterine eklesin.' },
      { step: 3, title: 'Posteri İnceleyin', description: 'Poster dolduğunda, birlikte bakın. "Vay canına! Bu postere bakan biri senin hakkında ne kadar çok şey öğrenebilir. Makarnayı, kedileri ve mavi rengi sevdiğini hemen anlar. İşte bu poster, senin kişisel verilerinden oluşuyor."' },
      { step: 4, title: 'Yapay Zekaya Nazikçe Bağlayın', description: '"Bazen internette video izlerken, bilgisayar da senin hakkında böyle veriler toplamaya çalışır. Eğer sen hep kedi videoları izlersen, \'Demek ki kedileri seviyor\' diye düşünür ve sana daha çok kedi videosu gösterir. Senin sevdiğin şeyleri öğrenerek sana özel öneriler sunmaya çalışır."' },
    ],
    observations: [
      { title: 'Benlik Algısı', description: 'Kendine ait tercihleri ve özellikleri fark etmesi ve ifade etmesi.' },
      { title: 'Yaratıcılık ve Sanatsal İfade', description: 'Düşüncelerini ve sevdiklerini resim yoluyla anlatması.' },
      { title: 'Sembolik Düşünme', description: 'Bir çizimin veya resmin gerçek bir nesneyi veya tercihi temsil ettiğini anlaması.' },
      { title: 'Kavramsal Anlayış', description: '"Veri" kelimesinin sadece sayılar değil, aynı zamanda kişisel bilgiler ve tercihler olabileceği fikrini sezmesi.' },
    ],
  },
  'Müzik ve Ritim': {
    type: 'Desen Tanıma (İşitsel ve Kinestetik)',
    materials: [
      { item: 'Basit bir müzik aleti (marakas, tef, oyuncak davul) veya sadece alkış ve dizlere vurma', optional: true },
    ],
    purpose: 'Yapay zekanın temel yeteneklerinden biri olan desen tanımayı (pattern recognition) işitsel ve kinestetik bir yolla deneyimlemek. Tekrarlayan ritimlerin tahmin edilebilir olduğunu keşfetmek.',
    steps: [
      { step: 1, title: 'Oyunu Tanıtın', description: '"Bugün seninle bir ritim oyunu oynayacağız! Ben bir \'Ritim Robotu\' olacağım ve bir ritim başlatacağım. Senin görevin de benim ritmimi yakalayıp devam ettirmek."' },
      { step: 2, title: 'Basit Bir Desen Başlatın', description: 'Çok basit bir ritimle başlayın. Örneğin: Alkış - Diz - Alkış - Diz... Bu ritmi birkaç kez yavaşça tekrarlayarak çocuğunuzun deseni anlamasına olanak tanıyın.' },
      { step: 3, title: 'Katılıma Davet Edin', description: '"Hadi şimdi sen de bana katıl!" diyerek onun da aynı ritmi yapmasını teşvik edin. Birlikte ritmi tutturduğunuzda onu "Harikasın! Ritim desenini çözdün!" diyerek motive edin.' },
      { step: 4, title: 'Tahmin Anı', description: 'Ritmi yaparken aniden durun. Alkış - Diz - Alkış - ... diye duraklayın ve merakla ona bakın. "Şimdi ne gelmesi gerekiyor?" diye sorun. Doğru cevabı ("Diz!") verdiğinde onu kutlayın. Bu, desenden yola çıkarak tahmin yürütme anıdır.' },
      { step: 5, title: 'Rolleri Değişin', description: '"Şimdi \'Ritim Robotu\' olma sırası sende! Sen bir desen başlat, ben devamını getirmeye çalışayım." Bu, onun kendi desenini yaratmasını ve kuralı pekiştirmesini sağlar.' },
      { step: 6, title: 'Yapay Zekaya Bağlayın', description: 'Oyun bittiğinde, "Gördün mü? Sen kulağınla ritimdeki deseni fark ettin ve sıradaki vuruşun ne olacağını tahmin ettin. İşte müzik dinlediğimiz uygulamalardaki yapay zeka da böyle çalışır. Senin hep hareketli şarkılar dinlediğini fark ederse (bu bir desendir!), \'Hımm, galiba hareketli şarkıları seviyor\' der ve sana yeni hareketli şarkılar önerir. O da seslerdeki desenleri tanır!"' },
    ],
    observations: [
      { title: 'Ritmik Algı', description: 'İşitsel olarak sunulan ritimdeki tekrarı fark edebilmesi.' },
      { title: 'Motor Beceri ve Koordinasyon', description: 'Duyduğu ritmi kendi vücut hareketleriyle (alkış, dize vurma) taklit edebilmesi.' },
      { title: 'Tahmin Yürütme', description: 'Verilen bir desenin bir sonraki adımını öngörebilmesi.' },
      { title: 'Yaratıcılık', description: 'Kendi özgün ritim desenini oluşturma çabası.' },
    ],
  },
  'Örüntü Blokları': {
    type: 'Kural Çıkarma (Görsel)',
    materials: [
      { item: 'Farklı renk ve/veya şekillerde Legolar, bloklar, küpler veya renkli makarnalar' },
    ],
    purpose: 'Görsel bir deseni oluşturan temel kuralı keşfetmek. Bu kuralı kullanarak sıradaki elemanı tahmin etme (çıkarım yapma) becerisini geliştirmek.',
    steps: [
      { step: 1, title: 'Oyunu Kurun', description: '"Şimdi de gözlerimizle desenleri avlayacağız! Ben bir \'Desen Ustasıyım\' ve gizli bir kurala göre blokları dizeceğim. Senin görevin ise bu gizli kuralı bulmak."' },
      { step: 2, title: 'Basit Bir Örüntü Oluşturun (ABAB)', description: 'En basit örüntüyle başlayın. Örneğin: Kırmızı - Mavi - Kırmızı - Mavi...' },
      { step: 3, title: 'Keşfetmesi İçin Sorular Sorun', description: 'Çocuğunuza diziyi gösterin ve "Burada bir tekrar görüyor musun? Sence benim gizli kuralım ne olabilir?" gibi sorularla onu düşünmeye teşvik edin.' },
      { step: 4, title: 'Tahmin Etmesini İsteyin', description: 'Dizinin sonuna gelin: Kırmızı - Mavi - Kırmızı - Mavi - ve bir sonraki bloğun yerini boş bırakarak sorun: "Sence buraya şimdi hangi renkli blok gelmeli?"' },
      { step: 5, title: 'Kuralı Söze Dökün', description: 'Doğru tahmin ettiğinde, "Evet, doğru! Çünkü kuralımız \'Bir kırmızı, bir mavi\' şeklinde." diyerek kuralı sözel olarak ifade edin.' },
      { step: 6, title: 'Yeni Kurallar Deneyin', description: 'Çocuğunuz kavradıkça daha karmaşık kurallar deneyin (AAB: Kırmızı-Kırmızı-Mavi... veya ABC: Kırmızı-Mavi-Sarı...).' },
      { step: 7, title: 'Yapay Zekaya Bağlayın', description: 'Etkinliğin sonunda, "Aferin sana, kuralı çözdün! Yapay zeka da tıpkı senin gibi desenlere ve kurallara bakarak tahminlerde bulunur. Mesela hava durumu tahmini yapan yapay zeka, geçmişteki bilgilere bakar. \'Hımm, bulutlar bu şekilde göründüğünde ve rüzgar bu yönden estiğinde (bu bir desen!), genellikle yağmur yağmış (bu bir kural!)\' der ve bize yarın yağmur yağıp yağmayacağını söyler."' },
    ],
    observations: [
      { title: 'Görsel Algı ve Desen Tanıma', description: 'Renk veya şekillerdeki sıralı tekrarı fark edebilmesi.' },
      { title: 'Mantıksal Akıl Yürütme', description: 'Gördüğü desenden yola çıkarak altta yatan basit kuralı anlayabilmesi.' },
      { title: 'Kural Uygulama', description: 'Keşfettiği kuralı kullanarak örüntüyü doğru bir şekilde devam ettirebilmesi.' },
      { title: 'Problem Çözme', description: 'Farklı ve daha karmaşık desenler sunulduğunda yeni kuralı çözme çabası.' },
    ],
  },
  '"Eğer... O Zaman..." Oyunu': {
    type: 'Algoritmik Düşünme (Mantıksal ve Fiziksel)',
    materials: [
      { item: 'Sadece kendiniz ve hayal gücünüz!', optional: true },
    ],
    purpose: 'Algoritmik düşünmenin ve kodlamanın en temel yapı taşı olan "Eğer... (koşul) O zaman... (eylem)" mantığını tamamen fiziksel bir oyunla somutlaştırmak.',
    steps: [
      { step: 1, title: 'Sihirli Kelimeleri Tanıtın', description: '"Şimdi sihirli kelimelerle bir komut oyunu oynayacağız. Sihirli kelimelerimiz: \'EĞER\' ve \'O ZAMAN\'. Ben bir kural söyleyeceğim, sen de o kurala uyacaksın. Hazır mısın?"' },
      { step: 2, title: 'İlk Kuralı Koyun', description: 'Basit ve net bir kuralla başlayın. "Eğer ben ellerimi çırparsam, o zaman sen tek ayak üstünde zıpla." Kuralı söyleyin ve ardından ellerinizi çırpın. Çocuğunuzun zıplamasını bekleyin.' },
      { step: 3, title: 'Kuralı Test Edin', description: 'Kuralı pekiştirmek için, ellerinizi çırpmak yerine burnunuza dokunun. Çocuğunuz bir şey yapmamalıdır. Eğer bir şey yaparsa, "Dur bakalım, kuralımız neydi? Sadece ben ellerimi çırparsam zıplıyordun." diyerek hatırlatın. Bu, koşulun önemini vurgular.' },
      { step: 4, title: 'Yeni Kurallar Ekleyin', description: 'Oyuna yeni kurallar ekleyin. "Eğer ben başımı kaşırsam, o zaman sen bir kedi gibi miyavla." Şimdi iki kuralınız var. Rastgele birini yaparak doğru tepkiyi alıp almadığınızı kontrol edin.' },
      { step: 5, title: 'Rolleri Değişin', description: '"Şimdi sıra sende! Sen bir \'Eğer... O zaman...\' kuralı koy, ben de yapayım." Bu, onun kural oluşturma mantığını kavramasına yardımcı olur.' },
      { step: 6, title: 'Yapay Zekaya Bağlayın', description: 'Oyun sonunda, "Bu süper bir oyundu! Biliyor musun, bütün bilgisayarlar, robotlar ve akıllı oyuncaklar bu \'Eğer... O zaman...\' kurallarıyla çalışır. Mesela bir oyunda, eğer sen ileri tuşuna basarsan, o zaman araba ileri gider. Ya da robot süpürge, eğer bir duvara yaklaşırsa, o zaman geri döner. Onların beyni bu basit kurallarla doludur!"' },
    ],
    observations: [
      { title: 'Dikkat ve Talimat Takibi', description: 'Belirtilen koşul (Eğer...) gerçekleştiğinde, istenen eylemi (O zaman...) yapabilmesi.' },
      { title: 'Neden-Sonuç İlişkisi Kurma', description: 'Belirli bir eylemin, belirli bir koşula bağlı olduğunu anlaması.' },
      { title: 'Algoritmik Düşünme Temeli', description: 'Bir problemi (ne yapacağını bilmek) basit bir kural setine göre çözebilmesi.' },
      { title: 'Mantıksal Kural Oluşturma', description: 'Kendisinin de anlamlı bir "Eğer... O zaman..." kuralı kurabilmesi.' },
    ],
  },
  // Hafta 4 - Makineler Nasıl Öğrenir?
  'Sıcak-Soğuk Oyunu': {
    type: 'Fiziksel Oyun ve Keşif (Pekiştirmeli Öğrenme)',
    materials: [
      { item: 'Saklamak için çocuğun sevdiği küçük bir oyuncak veya herhangi bir nesne' },
    ],
    purpose: 'Yapay zekanın en temel öğrenme yöntemlerinden biri olan "pekiştirmeli öğrenmeyi" (reinforcement learning) somutlaştırmak. Bu yöntemde YZ, hedefe yaklaştıran eylemler için "ödüllendirilir" (sıcak), hedeften uzaklaştıran eylemler için "cezalandırılır" (soğuk) ve bu geri bildirimlerle doğru yolu bulmayı öğrenir.',
    steps: [
      { step: 1, title: 'Oyunu Kurun', description: 'Çocuğunuz odadan çıktıktan sonra nesneyi saklayın. Çok zor bir yer olmasın.' },
      { step: 2, title: 'Rolleri Belirleyin', description: '"Şimdi sen hedefini bulmaya çalışan akıllı bir robot olacaksın. Ben de senin rehber programın olacağım. Sana doğru ya da yanlış yolda olduğunu söyleyen sinyaller göndereceğim."' },
      { step: 3, title: 'Kuralları Anlatın', description: '"Eğer sakladığım oyuncağa yaklaşırsan sana \'Sıcak\' diyeceğim. Çok yaklaşırsan \'Kaynıyor!\' diyeceğim. Eğer oyuncaktan uzaklaşırsan \'Soğuk\' diyeceğim. Çok uzaklaşırsan \'Buz gibi!\' diyeceğim. Senin görevin benim sinyallerimi dinleyerek oyuncağı bulmak."' },
      { step: 4, title: 'Oyunu Başlatın', description: 'Çocuğunuz odaya girip aramaya başlasın. Sabırlı olun ve sürekli olarak net geri bildirimler verin. Yönünü değiştirdiğinde sinyalinizin de nasıl değiştiğini fark etmesini sağlayın.' },
      { step: 5, title: 'Başarıyı Kutlayın', description: 'Nesneyi bulduğunda onu coşkuyla tebrik edin! "Harikasın! Sinyalleri takip ederek hedefine ulaştın. Geri bildirimlerle öğrenmeyi başardın!"' },
      { step: 6, title: 'Yapay Zekaya Bağlayın', description: '"İşte bazı yapay zekalar da tıpkı senin gibi öğrenir. Bir bilgisayar oyununda doğru bir hamle yaptığında, program ona \'sıcak\' sinyali gibi bir \'puan\' verir. Yanlış hamle yaptığında ise puan vermez. Böylece yapay zeka, en çok puanı getiren hamleleri yapa yapa oyunu kazanmayı öğrenir. Senin sıcak-soğuk ile oyuncağı bulmayı öğrendiğin gibi!"' },
    ],
    observations: [
      { title: 'Stratejik Düşünme', description: 'Odanın içinde rastgele dolaşmak yerine, "sıcak" sinyalini aldığı yöne doğru ısrarla gitmesi.' },
      { title: 'Dinlediğini Anlama ve Uygulama', description: 'İşitsel geri bildirimleri (sıcak/soğuk) fiziksel eyleme dönüştürebilme becerisi.' },
      { title: 'Problem Çözme', description: '"Soğuk" sinyali aldığında stratejisini değiştirip farklı bir yöne gitme esnekliği.' },
      { title: 'Deneme-Yanılma', description: 'Farklı yolları deneyerek ve sonuçlarını görerek hedefe ulaşması.' },
    ],
  },
  'Hayvanları Tahmin Et': {
    type: 'Bilişsel Oyun (Gözetimli Öğrenme)',
    materials: [
      { item: 'Üzerinde farklı hayvan resimleri olan kartlar, çıkartmalar veya hayvan oyuncakları (3-4 tanesi eğitim, 1-2 tanesi test için)' },
    ],
    purpose: 'Yapay zekanın en yaygın öğrenme yöntemi olan "gözetimli öğrenmeyi" (supervised learning) canlandırmak. Bu yöntemde YZ\'ye etiketlenmiş veriler ("Bu bir kedidir", "Bu bir köpektir") gösterilerek eğitilir ve sonra etiketlenmemiş yeni bir veriyi doğru tahmin etmesi beklenir.',
    steps: [
      { step: 1, title: 'Rolleri Belirleyin', description: '"Haydi bir oyun oynayalım. Sen öğrenmeye hazır, çok akıllı bir bilgisayar olacaksın. Ben de sana bilgi yükleyen bir öğretmen olacağım."' },
      { step: 2, title: '"Eğitim" Aşaması', description: '3-4 farklı hayvanı önüne koyun ve her birini net bir şekilde etiketleyin. Bilgisayar gibi konuşarak oyunu eğlenceli hale getirin: "BİLGİ YÜKLENİYOR... Bu bir kedi. Miyavlar ve dört ayağı vardır. Veri kaydedildi." Sonra diğer hayvana geçin: "BİLGİ YÜKLENİYOR... Bu bir kuş. Cikler ve kanatları vardır. Veri kaydedildi."' },
      { step: 3, title: '"Test" Aşaması', description: 'Eğitimde kullanmadığınız yeni bir hayvan kartını (örneğin bir balık) gösterin. "EĞİTİM TAMAMLANDI. Şimdi test zamanı! Yüklenen bilgilere göre, sence bu hayvan nedir?" diye sorun.' },
      { step: 4, title: 'Sonucu Değerlendirin', description: 'Doğru tahmin ederse, "Harika! Öğrenme başarılı! Bilgileri doğru kullandın." Yanlış tahmin ederse veya bilemezse, "Sorun değil! Demek ki bilgisayarımızın biraz daha fazla \'eğitim verisine\' ihtiyacı var." diyerek bir balığın özelliklerini de anlatın. Bu, hataların öğrenme sürecinin bir parçası olduğunu gösterir.' },
      { step: 5, title: 'Yapay Zekaya Bağlayın', description: '"Yapay zekayı da aynen böyle eğitiyoruz. Ona binlerce \'bu bir kedidir\' etiketli kedi fotoğrafı gösteriyoruz. Yeterince öğrendikten sonra, daha önce hiç görmediği yeni bir kedi fotoğrafını gösterdiğimizde, \'Bu bir kedi!\' diye doğru tahmin edebiliyor."' },
    ],
    observations: [
      { title: 'Hafıza ve Geri Çağırma', description: 'Eğitim aşamasında verilen bilgileri aklında tutabilmesi.' },
      { title: 'Tümdengelim ve Sınıflandırma', description: 'Yeni gösterilen hayvanın özelliklerini, öğrendiği diğer hayvanların özellikleriyle karşılaştırarak bir sonuca varması.' },
      { title: 'Görsel Ayırt Etme', description: 'Farklı hayvanların görsel özellikleri arasındaki farkları (bıyık, kanat, yüzgeç vb.) algılaması.' },
      { title: 'Mantık Yürütme', description: '"Bu miyavlamıyor, o zaman kedi değil" gibi basit mantıksal çıkarımlar yapabilmesi.' },
    ],
  },
  'Resim Tamamlama': {
    type: 'Sanat ve Yaratıcılık Etkinliği (Tahmin Yürütme)',
    materials: [
      { item: 'Kağıt, boya kalemleri' },
      { item: 'Ebeveyn tarafından önceden çizilmiş, yarım bırakılmış basit resimler (örneğin, yarım bir güneş, tekerleksiz bir araba, çatısız bir ev, saksısı olmayan bir çiçek)' },
    ],
    purpose: 'Yapay zekanın eldeki eksik verilere dayanarak nasıl mantıklı tahminler yürüttüğünü ve boşlukları doldurduğunu yaratıcı bir şekilde göstermek.',
    steps: [
      { step: 1, title: 'Görevi Sunun', description: 'Yarım bırakılmış bir resmi çocuğunuzun önüne koyun. "Bu bir çizim bilmecesi! Ben resme başladım ama bitiremedim. Sence bu ne resmi olabilir ve eksik olan parçası ne?"' },
      { step: 2, title: 'Tahmin Et ve Tamamla', description: 'Çocuğunuzun tahminini dinleyin ve ardından eksik kısmı çizerek resmi tamamlamasını isteyin. Yarım daireyi tam bir güneşe, tekerleksiz arabaya tekerlekler, çatısız eve çatı çizmesi gibi...' },
      { step: 3, title: 'Sihirli Soruyu Sorun', description: 'Resim bittikten sonra en önemli soruyu sorun: "Bunun bir güneş olduğunu nereden anladın?" veya "Bu arabanın tekerleklere ihtiyacı olduğunu nasıl bildin?"' },
      { step: 4, title: 'Cevabı Değerlendirin', description: 'Muhtemelen "Çünkü güneşler yuvarlak olur" veya "Arabalar tekerleksiz gidemez" gibi cevaplar verecektir. Bu cevapları övün: "Harika! Çünkü senin beynin daha önce gördüğü bütün güneşleri ve arabaları hatırlıyor. O bilgilere bakarak resmin geri kalanını tahmin etti."' },
      { step: 5, title: 'Yapay Zekaya Bağlayın', description: '"Yapay zeka da aynen senin beynin gibi çalışır. Özellikle resim çizen yapay zekalar, internetteki milyonlarca resme bakarak \'öğrenirler\'. Sen ona \'denizde yüzen bir kedi\' çiz dediğinde, daha önce gördüğü milyonlarca deniz ve kedi resmindeki bilgileri birleştirerek, hiç görmediği bir resmi tahmin eder ve çizer. Tıpkı senin yarım resmi tamamlaman gibi!"' },
    ],
    observations: [
      { title: 'Görsel Bütünleme', description: 'Eksik bir görseli zihninde tamamlayabilme ve ne olduğunu tanıyabilme.' },
      { title: 'Yaratıcı Problem Çözme', description: 'Eksik parçayı mantıklı ve yaratıcı bir şekilde çizerek tamamlama.' },
      { title: 'Önceki Bilgileri Kullanma', description: 'Dünyayla ilgili genel bilgisini (arabaların tekerleği olduğu, evlerin çatısı olduğu vb.) bir problemi çözmek için kullanabilmesi.' },
      { title: 'Düşünceyi İfade Etme', description: 'Bir sonuca nasıl ulaştığını basit cümlelerle açıklama çabası.' },
    ],
  },
};

// Eski step yapısı (geriye dönük uyumluluk için)
const ACTIVITY_STEPS: { [key: string]: ActivityStep[] } = {
  'Evdeki Yapay Zeka Avı 🔍': [
    { step: 1, title: 'Hazırlık', description: 'Bir kağıt ve kalem alın. Çocuğunuza "Bugün evimizde yapay zeka kullanan cihazları bulacağız!" deyin.' },
    { step: 2, title: 'Oda Oda Gezin', description: 'Her odayı sırayla gezin. "Bu odada akıllı bir cihaz var mı?" diye sorun.' },
    { step: 3, title: 'Cihazları Listeleyin', description: 'Buldukça kağıda yazın: Akıllı telefon, tablet, akıllı TV, sesli asistan vb.' },
    { step: 4, title: 'Konuşun', description: 'Her cihaz için "Bu nasıl akıllı?" "Ne yapabiliyor?" sorularını sorun.' },
    { step: 5, title: 'Sayın', description: 'Kaç tane buldunuz? En çok hangi odada vardı?' },
  ],
  'Sesli Asistan ile Arkadaşlık 🗣️': [
    { step: 1, title: 'Tanışma', description: 'Sesli asistanı açın. "Merhaba, adın ne?" diye sorun.' },
    { step: 2, title: 'Basit Sorular', description: 'Sırayla sorun: "Hava nasıl?", "Saat kaç?", "Bir şaka anlat"' },
    { step: 3, title: 'Cevapları Dinleyin', description: 'Her cevaptan sonra durun. "Ne dedi?" diye sorun. Cevabı anladı mı?' },
    { step: 4, title: 'Çocuğun Sorusu', description: 'Şimdi çocuğunuz bir soru sorsun. Kendi merak ettiği bir şey.' },
    { step: 5, title: 'Konuşun', description: '"Sesli asistan nasıl cevap veriyor?" "İnsan gibi mi konuşuyor?" konuşun.' },
  ],
  'AI Öğretmen Oyunu 👨‍🏫': [
    { step: 1, title: 'Konu Seçin', description: 'Çocuğunuz bir konu seçsin: favori hayvanı, hobisi, okuldaki bir ders vb.' },
    { step: 2, title: 'İlk Deneme', description: 'Sesli asistana bu konu hakkında sorular sorun. "En sevdiğim hayvan nedir?" gibi.' },
    { step: 3, title: 'Gözlem', description: 'Asistan bildi mi? Neden bildi/bilmedi? Kağıda not alın.' },
    { step: 4, title: 'Farklı Sorular', description: 'Aynı konuyu farklı şekilde sorun. "Favori hayvanım hangisi?" "Hangi hayvanı severim?"' },
    { step: 5, title: 'Sonuç', description: 'Hangi soruları anlıyor? AI ne biliyor ne bilmiyor? Konuşun.' },
  ],
  'Görüntü Tanıma Deneyi 📸': [
    { step: 1, title: 'Uygulama Açın', description: 'Google Lens veya kamera uygulamasını açın. "Resim tanıma" özelliğini aktif edin.' },
    { step: 2, title: 'Kolay Objeler', description: 'Önce basit objeler deneyin: kalem, kitap, sandalye. AI tanıdı mı?' },
    { step: 3, title: 'Zor Objeler', description: 'Şimdi daha zor objeler: çocuğun çizimi, oyuncak, meyve. Ne kadar doğru?' },
    { step: 4, title: 'Farklı Açılar', description: 'Aynı objeyi farklı açılardan çekin. Hep aynı cevabı mı veriyor?' },
    { step: 5, title: 'Skor Tutun', description: '10 obje deneyin. Kaç tanesini doğru bildi? Kağıda yazın.' },
  ],
  'Doğruluk Dedektifi 🔎': [
    { step: 1, title: 'Sorular Hazırlayın', description: '5 soru yazın. 3 tanesi basit gerçek ("Dünya kaç yaşında?"), 2 tanesi karmaşık ("İklim değişikliğinin ana nedeni nedir?")' },
    { step: 2, title: 'AI\'ya Sorun', description: 'Her soruyu ChatGPT\'ye sorun. Cevapları kağıda not alın.' },
    { step: 3, title: 'Araştırın', description: 'Şimdi aynı soruları Google\'da aratın veya ansiklopediden bakın.' },
    { step: 4, title: 'Karşılaştırın', description: 'AI\'ın cevapları doğru muydu? Hangileri tamamen doğru, hangileri kısmen doğru, hangileri yanlış?' },
    { step: 5, title: 'Sonuç Çıkarın', description: 'AI hangi konularda güvenilir? Neden bazen yanlış yapıyor? Konuşun.' },
  ],
  'Mini AI Oyunu Tasarla 🎮': [
    { step: 1, title: 'Beyin Fırtınası', description: '"AI ne yapabilir?" diye sorun. Cevap verebilir, öğrenebilir, tanıyabilir... Listeyin.' },
    { step: 2, title: 'Oyun Türü Seçin', description: 'Bilgi yarışması mı, macera oyunu mu, bulmaca mı? Çocuğunuz seçsin.' },
    { step: 3, title: 'AI\'nın Rolü', description: 'Oyunda AI ne yapacak? Rakip mi, yardımcı mı, öğretmen mi?' },
    { step: 4, title: 'Çizin', description: 'Oyun ekranını çizin. Butonlar, karakterler, AI\'nın yerini gösterin.' },
    { step: 5, title: 'Kuralları Yazın', description: 'Oyun nasıl oynanır? AI ne zaman devreye girer? Kağıda yazın.' },
  ],
  // Hafta 1 - 3. etkinlikler
  'Robotların İşleri 🤖': [
    { step: 1, title: 'Robot Nedir?', description: 'Çocuğunuza "Robot ne yapar?" diye sorun. Beraber konuşun.' },
    { step: 2, title: 'Evde Ara', description: 'Evde robot özelliği olan cihazlar bulun: robot süpürge, çamaşır makinesi, bulaşık makinesi.' },
    { step: 3, title: 'Dışarıda Keşfet', description: 'Markette, bankada, hastanede hangi robotlar var? Fotoğraf çekin veya çizin.' },
    { step: 4, title: 'İşlerini Listeleyin', description: 'Her robotun hangi işi yaptığını yazın: temizlik, yemek pişirme, taşıma vb.' },
    { step: 5, title: 'Resmini Çiz', description: 'En ilginç bulduğunuz robotu çizin ve ne yaptığını yazın.' },
  ],
  'Ses Tanıma Oyunu 🎤': [
    { step: 1, title: 'Ses Kaydet', description: 'Telefondaki ses kayıt uygulamasını açın. 5 farklı ses kaydedin: alkış, kapı, kedi, araba vb.' },
    { step: 2, title: 'Dinleyin', description: 'Kayıtları dinleyin. Her ses farklı mı? Hangisi daha net?' },
    { step: 3, title: 'Tahmin Oyunu', description: 'Aile bireyleri sırayla ses dinlesin ve ne olduğunu tahmin etsin.' },
    { step: 4, title: 'Zorluk Arttır', description: 'Şimdi daha zor sesler: kuş sesi, yağmur, kalem yazma. Kaç tanesini doğru buldunuz?' },
    { step: 5, title: 'AI ile Karşılaştır', description: 'Sesli asistana sesleri dinletin. AI tanıdı mı? İnsan mı daha iyi, AI mı?' },
  ],
  'Algoritma Tasarımı 📐': [
    { step: 1, title: 'Rutin Seç', description: 'Sabah rutininizi düşünün: uyanmak, diş fırçalamak, kahvaltı yapmak...' },
    { step: 2, title: 'Adımları Yaz', description: 'Her adımı sırayla yazın. "Önce ... sonra ... en son ..." şeklinde.' },
    { step: 3, title: 'Kararları Ekle', description: '"Eğer hava soğuksa mont giy, değilse ceket giy" gibi karar noktaları ekleyin.' },
    { step: 4, title: 'Akış Çizin', description: 'Adımları oklar ile bağlayın. Başlangıç ve bitiş noktalarını işaretleyin.' },
    { step: 5, title: 'Optimize Edin', description: 'Hangi adımları birleştirebilirsiniz? Hangi adımlar gereksiz? Daha kısa versiyonunu yazın.' },
  ],
  // Hafta 2 - Yeni etkinlikler
  'Akıllı Asistan ile Konuş 🗣️': [
    { step: 1, title: 'Sorular Hazırlayın', description: 'Akıllı asistana soracağınız 5 soru yazın. Basit ve zor karışık olsun.' },
    { step: 2, title: 'Sırayla Sorun', description: 'Her soruyu sorun ve cevabı not alın. "Doğru mu?" diye kontrol edin.' },
    { step: 3, title: 'Farklı Şekilde Sor', description: 'Aynı soruyu farklı kelimelerle sorun. Cevap değişti mi?' },
    { step: 4, title: 'Komutlar Deneyin', description: '"Alarm kur", "Müzik çal", "Hava durumu" gibi komutlar verin.' },
    { step: 5, title: 'Sonuçları Paylaş', description: 'Hangi sorulara cevap verdi? Hangi komutları anlayamadı? Tartışın.' },
  ],
  'Yapay Zeka Çizim Yarışması 🎨': [
    { step: 1, title: 'Nesne Seçin', description: 'Basit bir nesne seçin: ev, ağaç, kedi, araba. Herkes aynı nesneyi çizecek.' },
    { step: 2, title: 'İnsan Çizer', description: 'Çocuğunuz nesneyi çizsin. Süre tutun: 3 dakika.' },
    { step: 3, title: 'AI Çizer', description: 'Bir çizim AI uygulaması kullanın (Midjourney, DALL-E vb.) veya Google\'da "AI generated [nesne]" aratın.' },
    { step: 4, title: 'Karşılaştırın', description: 'İki çizimi yan yana koyun. Neresinden farklı? Hangisi daha gerçekçi? Hangisi daha yaratıcı?' },
    { step: 5, title: 'Oylamaya Sunun', description: 'Aileye gösterin. Hangi çizimi beğendiler? Neden?' },
  ],
  'Yapay Zeka Karar Ağacı 🌳': [
    { step: 1, title: 'Hayvan Listesi', description: '10 hayvan yazın: kedi, köpek, kuş, balık, fil, aslan vb.' },
    { step: 2, title: 'İlk Soru', description: '"Karada mı yaşar, suda mı?" Hayvanları 2 gruba ayırın.' },
    { step: 3, title: 'İkinci Sorular', description: 'Her grup için yeni soru: "Büyük mü küçük mü?", "Evcil mi vahşi mi?"' },
    { step: 4, title: 'Ağacı Çizin', description: 'Sorular ve dalları çizin. Her hayvan doğru yere gitsin.' },
    { step: 5, title: 'Test Edin', description: 'Birisi hayvan tutsun, siz sorularla bulmaya çalışın. Kaç soruda buldunuz?' },
  ],
  'Veri Toplama Dedektifleri 🔎': [
    { step: 1, title: 'Veri Konusu Seçin', description: 'Ne hakkında veri toplayacaksınız? Hava durumu, yemek tercihleri, oyun süreleri?' },
    { step: 2, title: 'Tablo Hazırlayın', description: 'Bir haftalık tablo çizin. Her güne yer açın.' },
    { step: 3, title: 'Veri Toplayın', description: 'Her gün aynı saatte veriyi kaydedin. Düzenli olun!' },
    { step: 4, title: 'Grafik Yapın', description: 'Verileri grafik kağıdına çizin. Çubuk grafik veya çizgi grafik.' },
    { step: 5, title: 'Sonuç Çıkarın', description: 'Hangi gün en yüksek? Hangi gün en düşük? Bir örüntü var mı?' },
  ],
  'Makine Öğrenmesi Deneyi 🧪': [
    { step: 1, title: 'Rakamlar Çizin', description: 'Kağıda 0-9 arası rakamları 10\'ar kere çizin. Hepsi farklı olsun.' },
    { step: 2, title: 'İlk Deneme', description: 'Bir arkadaşınıza gösterin. İlk 10 tanesinden kaç tanesini doğru okudu?' },
    { step: 3, title: 'Pratik', description: 'Şimdi 20 tane daha gösterin. Daha mı iyi oldu? Öğrendi mi?' },
    { step: 4, title: 'Zor Rakamlar', description: 'En kötü yazılmış rakamları tekrar gösterin. Şimdi tanıdı mı?' },
    { step: 5, title: 'Sonuç', description: 'Pratik yaptıkça öğrenme nasıl arttı? AI de böyle mi öğrenir? Tartışın.' },
  ],
  'Yapay Zeka Etik Tartışması 💭': [
    { step: 1, title: 'Senaryolar Okuyun', description: 'İyi kullanım: Doktorlara hastalık teşhisinde yardım. Kötü kullanım: İnsanları takip etmek.' },
    { step: 2, title: 'Soru Sorun', description: '"AI her zaman doğru mu?", "AI hata yaparsa suç kimin?", "AI gizliliğimizi korumalı mı?"' },
    { step: 3, title: 'Örnekler Bulun', description: 'Günlük hayattan örnekler: Yüz tanıma, reklam gösterme, otomatik notlar verme.' },
    { step: 4, title: 'Kurallar Yazın', description: 'AI için 5 kural yazın. "AI asla ... yapmamalı." şeklinde.' },
    { step: 5, title: 'Sonuç', description: 'En önemli kural hangisi? Neden? Ailece paylaşın.' },
  ],
  'Yapay Zeka Yardımcıları 🦸': [
    { step: 1, title: 'Liste Yapın', description: 'Ailenizin kullandığı tüm AI uygulamalarını listeleyin: Navigasyon, çeviri, öneriler vb.' },
    { step: 2, title: 'Her Birini İnceleyin', description: 'Her uygulama ne yapıyor? Nasıl yardımcı oluyor?' },
    { step: 3, title: 'Günlük Kullanım', description: 'Bir gün boyunca kaç kere AI kullandınız? Sayın!' },
    { step: 4, title: 'AI Olmadan?', description: 'Bu işleri AI olmadan nasıl yapardınız? Daha zor mu olurdu?' },
    { step: 5, title: 'Favorinizi Seçin', description: 'En çok hangi AI yardımcısını seviyorsunuz? Neden?' },
  ],
  'Örüntü Bulma Ustası 🔢': [
    { step: 1, title: 'Sayı Dizileri', description: '2, 4, 6, 8, ... Sıradaki ne? 5 farklı sayı dizisi yazın.' },
    { step: 2, title: 'Şekil Dizileri', description: 'Kare, daire, üçgen, kare, daire, ... Sıradaki ne? Çizin.' },
    { step: 3, title: 'Renk Örüntüleri', description: 'Kırmızı, mavi, kırmızı, mavi, ... Renkli kalemlerle yapın.' },
    { step: 4, title: 'Karışık Örüntü', description: 'Şimdi sayı+şekil+renk karışık bir örüntü yapın. Arkadaşınız tamamlasın.' },
    { step: 5, title: 'Hayatta Örüntüler', description: 'Günlük hayatta hangi örüntüler var? Haftanın günleri, mevsimler... Bulun!' },
  ],
  'Yapay Zeka ve Geleceğimiz 🚀': [
    { step: 1, title: 'Beyin Fırtınası', description: '2050 yılında AI neler yapabilir? Uçan arabalar, robot öğretmenler... Hayal edin!' },
    { step: 2, title: 'Problem Seçin', description: 'Hangi problem çözülmeli? Çevre kirliliği, hastalıklar, eğitim, trafik?' },
    { step: 3, title: 'AI Çözümü Tasarlayın', description: 'AI bu problemi nasıl çözer? Detaylarıyla yazın.' },
    { step: 4, title: 'Çizin ve Anlatın', description: 'AI çözümünüzü çizin. Nasıl çalışır? Adım adım anlatın.' },
    { step: 5, title: 'Sunum Yapın', description: 'Ailenize sunun. "Bu AI uygulaması şu problemi şöyle çözecek!" deyin.' },
  ],
};

const ActivityDetailScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const { activity, child } = route.params;
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showReflectionModal, setShowReflectionModal] = useState(false);
  const [reflectionAnswer, setReflectionAnswer] = useState('');

  // Supabase'den gelen zengin içerik veya eski step yapısı (fallback)
  const activitySteps = activity.steps || ACTIVITY_STEPS[activity.title] || [];
  const activityObservations = activity.observations || [];
  const activityDetailedMaterials = activity.detailed_materials || [];
  const ageGroup = `${activity.age_min}-${activity.age_max}`;
  const weekInfo = WEEK_INFO[ageGroup]?.[activity.week_number];

  useEffect(() => {
    if (child) {
      checkActivityCompletion();
    }
  }, [child]);

  const checkActivityCompletion = async () => {
    if (!child) return;

    const parentId = child.parent_id;
    if (!parentId) return;

    try {
      const { data, error } = await supabase
        .from('completed_activities')
        .select('completed_at')
        .eq('parent_id', parentId)
        .eq('activity_id', activity.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setIsCompleted(!!data?.completed_at);
    } catch (error) {
      console.error('Etkinlik kontrolü hatası:', error);
    }
  };

  const toggleStep = (stepNumber: number) => {
    const newCompletedSteps = new Set(completedSteps);
    if (newCompletedSteps.has(stepNumber)) {
      newCompletedSteps.delete(stepNumber);
    } else {
      newCompletedSteps.add(stepNumber);
    }
    setCompletedSteps(newCompletedSteps);
  };

  const allStepsCompleted = activitySteps.length > 0 && completedSteps.size === activitySteps.length;

  const awardPoints = async (childId: string, points: number) => {
    try {
      const { data: childData } = await supabase
        .from('parent_profiles')
        .select('total_points')
        .eq('id', childId)
        .single();

      const currentPoints = childData?.total_points || 0;
      const newTotalPoints = currentPoints + points;

      const { error } = await supabase
        .from('parent_profiles')
        .update({ total_points: newTotalPoints })
        .eq('id', childId);

      if (error) throw error;
      return newTotalPoints;
    } catch (error) {
      console.error('Puan ekleme hatası:', error);
      return 0;
    }
  };

  const completeActivity = () => {
    if (!allStepsCompleted) {
      Alert.alert(
        'Bekleyin!',
        'Etkinliği tamamlamak için önce tüm adımları tamamlamanız gerekiyor.',
        [{ text: 'Tamam' }]
      );
      return;
    }

    // Değerlendirme sorusu varsa modal'ı göster
    if (activity.reflection_question) {
      setShowReflectionModal(true);
    } else {
      markActivityComplete();
    }
  };

  const markActivityComplete = async () => {
    if (!child) return;

    // Ebeveyn profilinin ID'sini al
    const parentId = child.parent_id;
    if (!parentId) {
      Alert.alert('Hata', 'Ebeveyn profili bulunamadı');
      return;
    }

    setIsLoading(true);
    try {
      const { data: existingCompletion } = await supabase
        .from('completed_activities')
        .select('completed_at')
        .eq('parent_id', parentId)
        .eq('activity_id', activity.id)
        .single();

      const isFirstCompletion = !existingCompletion;

      const { error } = await supabase
        .from('completed_activities')
        .upsert({
          parent_id: parentId,
          activity_id: activity.id,
          completed_at: new Date().toISOString(),
        }, {
          onConflict: 'parent_id,activity_id',
        });

      if (error) throw error;

      setIsCompleted(true);
      setShowReflectionModal(false);

      if (isFirstCompletion) {
        const activityPoints = activity.points || 5;
        const newTotalPoints = await awardPoints(parentId, activityPoints);

        const pointBadges = await checkAndAwardPointBadges(parentId, newTotalPoints);

        if (pointBadges.length > 0) {
          const pointBadgeNames = pointBadges.map(b => `${b.emoji} ${b.name}`).join(', ');
          Alert.alert(
            '🎉 Tebrikler!',
            `Etkinliği tamamladınız ve ${activityPoints} puan kazandınız!\n\n🏆 Yeni Rozet: ${pointBadgeNames}\n\nToplam Puan: ${newTotalPoints}`,
            [{
              text: 'Harika!',
              onPress: () => navigation.goBack()
            }]
          );
        } else {
          Alert.alert(
            '🎉 Tebrikler!',
            `Etkinliği tamamladınız ve ${activityPoints} puan kazandınız!\n\nToplam Puan: ${newTotalPoints}`,
            [{
              text: 'Tamam',
              onPress: () => navigation.goBack()
            }]
          );
        }
      } else {
        Alert.alert(
          '🎉 Harika!',
          'Etkinliği başarıyla tamamladınız!',
          [{ text: 'Tamam', onPress: () => navigation.goBack() }]
        );
      }
    } catch (error) {
      console.error('Etkinlik tamamlama hatası:', error);
      Alert.alert(
        'Hata',
        'Etkinlik tamamlanırken bir hata oluştu.',
        [{ text: 'Tamam' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case 'game': return '🎮';
      case 'conversation': return '💬';
      case 'creative': return '🎨';
      case 'exploration': return '🔍';
      default: return '📝';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'game': return 'Oyun';
      case 'conversation': return 'Konuşma';
      case 'creative': return 'Yaratıcılık';
      case 'exploration': return 'Keşif';
      default: return 'Etkinlik';
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      {/* Modern Header */}
      <View style={styles.header}>
        {weekInfo && (
          <View style={styles.weekBadge}>
            <Text style={styles.weekBadgeText}>Hafta {activity.week_number}</Text>
          </View>
        )}
        <Text style={styles.title}>{activity.title}</Text>

        {/* Etkinlik Türü Badge */}
        <View style={styles.typeBadgeContainer}>
          <View style={styles.typeBadge}>
            <Text style={styles.typeBadgeEmoji}>{getTypeEmoji(activity.type)}</Text>
            <Text style={styles.typeBadgeText}>
              {activity.activity_type_label || getTypeLabel(activity.type)}
            </Text>
          </View>
        </View>

        {/* Meta Bilgiler */}
        <View style={styles.metaRow}>
          <View style={styles.metaChip}>
            <Text style={styles.metaChipIcon}>⏱️</Text>
            <Text style={styles.metaChipText}>{activity.duration} dk</Text>
          </View>
          <View style={styles.metaChip}>
            <Text style={styles.metaChipIcon}>👶</Text>
            <Text style={styles.metaChipText}>{activity.age_min}-{activity.age_max} yaş</Text>
          </View>
          <View style={styles.metaChip}>
            <Text style={styles.metaChipIcon}>⭐</Text>
            <Text style={styles.metaChipText}>{activity.points || 5} puan</Text>
          </View>
        </View>
      </View>

      {/* Hafta Açıklaması */}
      {weekInfo && (
        <View style={styles.weekInfoContainer}>
          <Text style={styles.weekInfoTitle}>🎯 {weekInfo.title}</Text>
          <Text style={styles.weekInfoDescription}>{weekInfo.description}</Text>
        </View>
      )}

      {/* Etkinlik Görseli */}
      {activity.image_url && (
        <View style={styles.activityImageContainer}>
          <Image
            source={{ uri: activity.image_url }}
            style={styles.activityImage}
            resizeMode="cover"
          />
        </View>
      )}

      {/* Amaç */}
      {activity.purpose && (
        <View style={styles.purposeContainer}>
          <Text style={styles.sectionTitle}>🎯 Amaç</Text>
          <Text style={styles.purposeText}>{activity.purpose}</Text>
        </View>
      )}

      {/* Gerekli Malzemeler */}
      {activityDetailedMaterials && activityDetailedMaterials.length > 0 ? (
        <View style={styles.materialsContainer}>
          <Text style={styles.sectionTitle}>🛠️ Gerekli Malzemeler</Text>
          {activityDetailedMaterials.map((material: ActivityMaterial, index: number) => (
            <View key={index} style={styles.materialItem}>
              <View style={[styles.materialBullet, material.optional && styles.materialBulletOptional]}>
                <Text style={styles.materialBulletText}>{material.optional ? '○' : '●'}</Text>
              </View>
              <View style={styles.materialContent}>
                <Text style={styles.materialText}>{material.item}</Text>
                {material.optional && (
                  <Text style={styles.materialOptionalText}>İsteğe bağlı</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      ) : activity.materials && activity.materials.length > 0 && (
        <View style={styles.materialsContainer}>
          <Text style={styles.sectionTitle}>🛠️ Gerekli Malzemeler</Text>
          {activity.materials.map((material, index) => (
            <View key={index} style={styles.materialItem}>
              <View style={styles.materialBullet}>
                <Text style={styles.materialBulletText}>●</Text>
              </View>
              <Text style={styles.materialText}>{material}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Adım Adım Uygulama Rehberi */}
      {activitySteps.length > 0 && (
        <View style={styles.stepsContainer}>
          <Text style={styles.sectionTitle}>📋 Ebeveyn İçin Adım Adım Uygulama Rehberi</Text>
          <Text style={styles.stepsHint}>Her adımı tamamladıkça işaretleyin</Text>
          {activitySteps.map((step) => (
            <TouchableOpacity
              key={step.step}
              style={[
                styles.stepCard,
                completedSteps.has(step.step) && styles.stepCardCompleted
              ]}
              onPress={() => toggleStep(step.step)}
              disabled={isCompleted}
            >
              <View style={styles.stepHeader}>
                <View style={[
                  styles.stepNumberContainer,
                  completedSteps.has(step.step) && styles.stepNumberContainerCompleted
                ]}>
                  <Text style={[
                    styles.stepNumber,
                    completedSteps.has(step.step) && styles.stepNumberCompleted
                  ]}>
                    {completedSteps.has(step.step) ? '✓' : step.step}
                  </Text>
                </View>
                <Text style={[
                  styles.stepTitle,
                  completedSteps.has(step.step) && styles.stepTitleCompleted
                ]}>{step.title}</Text>
              </View>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Gözlemlenmesi Gereken Davranış ve Beceriler */}
      {activityObservations && activityObservations.length > 0 && (
        <View style={styles.observationsContainer}>
          <Text style={styles.sectionTitle}>👀 Gözlemlenmesi Gereken Davranış ve Beceriler</Text>
          {activityObservations.map((obs: ActivityObservation, index: number) => (
            <View key={index} style={styles.observationCard}>
              <View style={styles.observationHeader}>
                <View style={styles.observationNumber}>
                  <Text style={styles.observationNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.observationTitle}>{obs.title}</Text>
              </View>
              <Text style={styles.observationDescription}>{obs.description}</Text>
            </View>
          ))}
        </View>
      )}

      {isCompleted ? (
        <View style={styles.completedBadge}>
          <Text style={styles.completedIcon}>✅</Text>
          <Text style={styles.completedText}>Bu etkinliği tamamladınız!</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={[
            styles.completeButton,
            (!allStepsCompleted || isLoading) && styles.completeButtonDisabled
          ]}
          onPress={completeActivity}
          disabled={!allStepsCompleted || isLoading}
        >
          <Text style={styles.completeButtonText}>
            {isLoading ? 'Kaydediliyor...' : '✓ Etkinliği Tamamla'}
          </Text>
          {!allStepsCompleted && (
            <Text style={styles.completeButtonSubtext}>
              ({completedSteps.size}/{activitySteps.length} adım tamamlandı)
            </Text>
          )}
        </TouchableOpacity>
      )}

      {/* Değerlendirme Modal */}
      <Modal
        visible={showReflectionModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowReflectionModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>💭 Bugün Ne Fark Ettiniz?</Text>
            <Text style={styles.modalQuestion}>{activity.reflection_question}</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Düşüncelerinizi yazın (opsiyonel)"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              value={reflectionAnswer}
              onChangeText={setReflectionAnswer}
              textAlignVertical="top"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonSecondary}
                onPress={() => {
                  setReflectionAnswer('');
                  setShowReflectionModal(false);
                }}
              >
                <Text style={styles.modalButtonSecondaryText}>İptal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButtonPrimary}
                onPress={markActivityComplete}
                disabled={isLoading}
              >
                <Text style={styles.modalButtonPrimaryText}>
                  {isLoading ? 'Kaydediliyor...' : 'Tamamla'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#32738C',
    padding: 24,
    paddingTop: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  weekBadge: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  weekBadgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  typeBadgeContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2BFAC',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  typeBadgeEmoji: {
    fontSize: 20,
  },
  typeBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#193140',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  metaChipIcon: {
    fontSize: 14,
  },
  metaChipText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  weekInfoContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    backgroundColor: '#A7CBD9',
    borderRadius: 16,
  },
  weekInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#193140',
    marginBottom: 10,
  },
  weekInfoDescription: {
    fontSize: 14,
    color: '#193140',
    lineHeight: 22,
  },
  activityImageContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#193140',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  activityImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
  },
  purposeContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F26B5E',
    elevation: 2,
    shadowColor: '#193140',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#193140',
    marginBottom: 12,
  },
  purposeText: {
    fontSize: 15,
    color: '#32738C',
    lineHeight: 24,
  },
  materialsContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  materialItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  materialBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  materialBulletOptional: {
    backgroundColor: '#E5E7EB',
  },
  materialBulletText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  materialContent: {
    flex: 1,
  },
  materialText: {
    flex: 1,
    fontSize: 14,
    color: '#78350F',
    lineHeight: 22,
  },
  materialOptionalText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
    marginTop: 4,
  },
  stepsContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  stepsHint: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  stepCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    elevation: 2,
    shadowColor: '#193140',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  stepCardCompleted: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumberContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#32738C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  stepNumberContainerCompleted: {
    backgroundColor: '#10B981',
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  stepNumberCompleted: {
    color: '#FFFFFF',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#193140',
    flex: 1,
  },
  stepTitleCompleted: {
    color: '#047857',
  },
  stepDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    marginLeft: 50,
  },
  observationsContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    backgroundColor: '#EDE9FE',
    borderRadius: 16,
  },
  observationCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  observationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  observationNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  observationNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  observationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5B21B6',
    flex: 1,
  },
  observationDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginLeft: 40,
  },
  completeButton: {
    backgroundColor: '#82BB5D',
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  completeButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  completeButtonSubtext: {
    fontSize: 12,
    color: '#E0F2D3',
    marginTop: 4,
  },
  completedBadge: {
    backgroundColor: '#D1FAE5',
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#10B981',
  },
  completedIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  completedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#047857',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalQuestion: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
    lineHeight: 22,
  },
  modalInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#111827',
    minHeight: 100,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButtonSecondary: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonSecondaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  modalButtonPrimary: {
    flex: 1,
    backgroundColor: '#82BB5D',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonPrimaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default ActivityDetailScreen;
