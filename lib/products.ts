export interface Product {
  id: number
  name: string
  price: number
  oldPrice?: number
  description: string
  fullDescription: string
  category: string
  categoryName: string
  image: string
  images: string[]
  rating: number
  reviewCount: number
  features: string[]
  dimensions: { name: string; value: string }[]
  colors?: { name: string; hex: string }[]
  materials?: string[]
  careInstructions: string
  reviews: {
    author: string
    rating: number
    date: string
    content: string
  }[]
  isNew?: boolean
  featured?: boolean
}

// Sample product data
const products: Product[] = [
  // ----------------------------------------
  // Stolice
  // ----------------------------------------

  // Oslo Lounge Chair
  {
    id: 1,
    name: "Oslo Stolica",
    price: 1299,
    oldPrice: 1499,
    description: "Udobna stolica sa drvenom osnovom i kožnim materijalom.",
    fullDescription:
      "Oslo Stolica kombinira udobnost sa skandinavskim dizajnerskim principima. Drvena osnova pruža trajnost i stabilnost, dok kožni materijal pruža udobnost i stil. Stolica ima ergonomski dizajn koji osigurava pravilnu podršku za duže vremena sjedenja, čini je savršenom za čitanje, razgovor ili jednostavno odmor.",
    category: "stolica",
    categoryName: "Stolice",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    rating: 4.8,
    reviewCount: 124,
    features: [
      "Drvena osnova za trajnost",
      "Premium kožni materijal",
      "Ergonomski dizajn za pravilnu podršku",
      "Mogućnost uklanjanja krovnih materijala za lako čišćenje",
      "Dostupna u više boja",
    ],
    dimensions: [
      { name: "Širina", value: "75 cm" },
      { name: "Dubina", value: "82 cm" },
      { name: "Visina", value: "86 cm" },
      { name: "Visina sjedala", value: "42 cm" },
      { name: "Visina ruku", value: "60 cm" },
      { name: "Težina", value: "18 kg" },
    ],
    colors: [
      { name: "Svijetlo siva", hex: "#D3D3D3" },
     
    ],
    materials: ["Drvena osnova"],
    careInstructions:
      "Vakuumirajte redovito koristeći nizak vakuum. Lokalno čistite s malim, vodotopivim rješenjem ili suhim čišćenjem. Izbjegavajte postavljanje u direktnu sunčevu svjetlost kako bi se spriječio pucanje. Fluff cushions regularly to maintain shape.",
    reviews: [
      {
        author: "Ema.",
        rating: 5,
        date: "March 15, 2025",
        content:
          "Ova stolica je apsolutno savršena! Kvaliteta je izvanredna, i još je udobnija od očekivanja. Savršeno se uklapa u moju dnevnu sobu i već brzo postala najdraža mjesta za sjedenje.",
      },
      {
        author: "Mihajlo",
        rating: 4,
        date: "February 28, 2025",
        content:
          "Odlična stolica sa izvrsnom kvalitetom. Kožni materijal je prekrasan i osjeća se trajnim. Samo 4 zvjezdice jer je sastavljanje bilo malo komplicirano, ali rezultat je vrijedan.",
      },
      {
        author: "Sara.",
        rating: 5,
        date: "January 10, 2025",
        content:
          "Imam ovo stolice već mjesec dana i volim je. Dizajn je vremenski nepromijenjen i udobnost je izvanredna. Preporučam!",
      },
    ],
    featured: true
  },

  // Copenhagen Armchair
  {
    id: 7,
    name: "Kopenhagen Stolica",
    price: 1099,
    description: "Elegant stolica sa drvenim nogu i premium linijem materijalom.",
    fullDescription:
      "Kopenhagen Stolica predstavlja skandinavski dizajn sa svojim čistim linijama, organičnim oblicima i fokusom na obožavanje i funkcionalnost. Elegantno zakrivljeni oblik stolice stvara impresivan profil iz svakog kuta, dok premium linijski materijal dodaje teksturu i toplinu. Podržan solidnim drvenim nogu koje pružaju stabilnost i vizualnu lakost, ova stolica pruža izvanrednu udobnost bez kompromisa sa stilom. Savršena kao dodirna komada ili u paru sa Malmo Sofa, Kopenhagen Stolica donosi elegantnu eleganciju u bilo koji prostor.",
    category: "stolica",
    categoryName: "Stolice",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    rating: 4.7,
    reviewCount: 83,
    features: [
      "Ergonomski zakrivljeni dizajn za maksimalnu udobnost",
      "Premium linijski materijal",
      "Solid drvene nogu sa prirodnim finish",
      "Visoka gustoća pene za udobnost",
      "Okvir za trajnost",
      "Neoznačiva podna ploča za zaštitu podova",
    ],
    dimensions: [
      { name: "Širina", value: "75 cm" },
      { name: "Dubina", value: "80 cm" },
      { name: "Visina", value: "85 cm" },
      { name: "Visina sjedala", value: "45 cm" },
      { name: "Dubina sjedala", value: "55 cm" },
      { name: "Visina ruku", value: "65 cm" },
      { name: "Težina", value: "15 kg" },
    ],
    colors: [
      { name: "Linijski materijal", hex: "#F0E9E0" },
      { name: "Tamna siva", hex: "#36454F" },
      { name: "Svijetla siva", hex: "#8DA9C4" },
      { name: "Svijetla siva", hex: "#708238" },
    ],
    materials: ["Drvena osnova", "Premium Linijski materijal", "Visoka gustoća pene", "Okvir"],
    careInstructions:
      "Vakuumirajte redovito koristeći nizak vakuum. Lokalno čistite s malim, vodotopivim rješenjem ili suhim čišćenjem. Professional cleaning recommended for overall soiling. Avoid placing in direct sunlight to prevent fabric fading. Treat any spills immediately by blotting (not rubbing) with a clean, dry cloth.",
    reviews: [
      {
        author: "Natalija.",
        rating: 5,
        date: "March 20, 2025",
        content:
          "Ova stolica je umjetnički rad! Vrlo udobna i linijski materijal je prekrasan. Drvena noga dodaje toplinu. Postala je moja omiljena mjesta za čitanje u kući.",
      },
      {
        author: "Jovan.",
        rating: 4,
        date: "February 15, 2025",
        content:
          "Odlična stolica sa izvrsnom pažnjom za detalje. Zakrivljeni dizajn pruža odličnu podršku za natrag. Jedina razloga za 5 zvjezdice je da je sastavljanje bilo malo komplicirano.",
      },
      {
        author: "Emilija.",
        rating: 5,
        date: "January 28, 2025",
        content:
          "Apsolutno volim ovu stolicu! Linijski materijal je prekrasan i osjeća se vrlo visoke kvalitete. Savršena veličina - dovoljno velika da bude udobna, ali ne i prevelika da preoptereti prostor.",
      },
    ],
    isNew: true
  },

  // ----------------------------------------
  // Stolovi
  // ----------------------------------------

  // Bergen Dining Table
  {
    id: 2,
    name: "Bergen Stol",
    price: 1899,
    oldPrice: 2199,
    description: "Prošireni stol sa drvenom osnovom i prirodnim finishom.",
    fullDescription:
      "Bergen Stolovl je izrađen od drvene osnove i ima prirodni finish koji istakne lepinu drveta. Stol ima glatke rubove i minimalistički dizajn koji ga čini fleksibilnim komadom koji se uklapa u različite interijske stile. Proširena funkcija omogućuje vam da primijenite dodatne goste kada je potrebno, čini ga savršenim za svakodnevnu jelovnicu i posebne prilike.",
    category: "stol",
    categoryName: "Stolovi",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    rating: 4.7,
    reviewCount: 89,
    features: [
      "Drvena osnova",
      "Prošireni dizajn - dodaje 50 cm kada je potpuno prošireno",
      "Glatki, zaobljeni rubovi za sigurnost",
      "Prirodni uljni finish koji povećava lepinu drveta",
      "Sjedićih mjesta za 6-8 ljudi (8-10 kada je prošireno)",
      "Lako koristivi mehanizam proširenja",
    ],
    dimensions: [
      { name: "Dužina", value: "180 cm (230 cm kada je prošireno)" },
      { name: "Širina", value: "90 cm" },
      { name: "Visina", value: "75 cm" },
      { name: "Težina", value: "45 kg" },
      { name: "Prošireni list", value: "50 cm" },
    ],
    colors: [
      { name: "Berry 199", hex: "#D2B48C" },
    ],
    materials: ["Kuvana bukovina"],
    careInstructions:
      "Čistite s malim, vodotopivim rješenjem ili suhim čišćenjem. Sušite odmah s malim, tvrdim čističem. Primijenite namještajski ulj za drvo svakih 6-12 mjeseci kako bi se održao finish. Izbjegavajte postavljanje toplih predmeta direktno na površinu; koristite koverte i pločice.",
    reviews: [
      {
        author: "Tomaš.",
        rating: 5,
        date: "April 2, 2025",
        content:
          "Ovaj stol je umjetnički rad! Izvrsnost je izvanredna, i mehanizam proširenja radi glatko. Postao je centar naše jelovnice.",
      },
      {
        author: "Ljiljana.",
        rating: 4,
        date: "March 18, 2025",
        content:
          "Prekrasan stol koji se osjeća vrlo solidan. Prirodni finish je prekrasan i ističe lepinu drveta. Jedina razloga za 4 zvjezdice je da je dostavljen s malim pucavim, ali klijentska podrška je izvrsna u rješavanju problema.",
      },
      {
        author: "Rajko",
        rating: 5,
        date: "February 5, 2025",
        content:
          "Vrijedan svake marke! Ovaj stol nije samo prekrasan, već je izvrsno izrađen. Funkcija proširenja je lahko koristiva i ima koristila mnogo puta kada smo imali večeru.",
      },
    ],
    featured: true
  },

  // Fjord Desk
  {
    id: 4,
    name: "Fjord Stol",
    price: 1199,
    description: "Minimalistički stol sa kabelskim upravljanjem i prilagodljivom visinom.",
    fullDescription:
      "Fjord Stol kombinira funkcionalnost sa elegantnim dizajnom, čini ga savršenim radnim prostorom za modernu kuću ili uređaj. Minimalistički estetski dizajn ima čiste linije i elegantan profil, dok je pažljivi dizajn uključuje praktične elemente kao što je integrirani kabelski upravljački sistem kako bi se održao vaš radni prostor uređen. Funkcija prilagodljive visine omogućuje vam da prilagodite stol na svoju savršenu radnu poziciju, promovirajući bolju podršku i udobnost tijekom dugih radnih sesija.",
    category: "stol",
    categoryName: "Stolovi",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    rating: 4.6,
    reviewCount: 58,
    features: [
      "Električna prilagodljiva visina (70-120 cm)",
      "Integrirani kabelski upravljački sistem",
      "Drvena osnova sa prirodnim finish",
      "Memory settings for preferred heights",
      "Skrivena skočna ploča za male stavke",
      "Anti-collision tehnologija",
    ],
    dimensions: [
      { name: "Širina", value: "140 cm" },
      { name: "Dubina", value: "70 cm" },
      { name: "Visina", value: "70-120 cm (prilagodljiva)" },
      { name: "Dimenzije skočne ploče", value: "30 cm x 40 cm x 5 cm" },
      { name: "Težina", value: "35 kg" },
    ],
    colors: [
      { name: "Drvena osnova - svijetla", hex: "#FFFFFF" },
      { name: "Drvena osnova - tamna", hex: "#000000" },
      { name: "Drvena osnova - tamna", hex: "#000000" },
    ],
    materials: ["Drvena osnova", "Čelični okvir", "Premium elektronika"],
    careInstructions:
      "Očistite drvenu površinu s malim, vodotopivim rješenjem ili suhim čišćenjem ako je potrebno. Sušite odmah s malim, tvrdim čističem. Za čelični okvir, koristite mali količinu staklenog čističa. Izbjegavajte vodu i provjerite kabelske veze redovito.",
    reviews: [
      {
        author: "Marko.",
        rating: 5,
        date: "April 10, 2025",
        content:
          "Ovaj stol je potpuno transformirao moj kućni uređaj. Prilagodljiva visina je glatka i tiha, i kabelski upravljački sistem čuva sve uređene. Vrijedan svake marke!",
      },
      {
        author: "Lara.",
        rating: 4,
        date: "March 5, 2025",
        content:
          "Prekrasan stol sa izvrsnom funkcionalnošću. Drvena osnova je prekrasna i prilagodljiva visina radi savršeno. Jedina razloga za 4 zvjezdice je da je sastavljanje bilo malo komplicirano.",
      },
      {
        author: "Jovan.",
        rating: 5,
        date: "February 20, 2025",
        content:
          "Nakon korištenja ovog stola mjesec dana, mogu sigurno reći da je jedan od najboljih kupnji koje sam napravila. Mogućnost prebacivanja između sjedenja i stojećeg položaja pomoći mi je mnogo u smanjenju bolova u leđima.",
      },
    ],
  },

  // ----------------------------------------
  // BEDS
  // ----------------------------------------

  // Stockholm Bed Frame
  {
    id: 3,
    name: "Stockholm Krevet",
    price: 2499,
    description: "King-size krevet sa integriranim noćnim stolovima i LED osvjetljenjem.",
    fullDescription:
      "Stockholm krevet redefiniše luksuz spavaće sobe svojim elegantnim dizajnom i pažljivo osmišljenim detaljima. Izrađen od vrhunskih materijala, ovaj bračni krevet sadrži integrisane noćne ormariće koji nude praktičan prostor za odlaganje, a istovremeno održavaju čist i skladan izgled. Suptilna LED rasvjeta stvara toplu atmosferu, idealnu za večernje čitanje ili opuštanje. Platformska konstrukcija eliminiše potrebu za boks oprugom, pružajući direktnu podršku dušeku za maksimalnu udobnost.",
    category: "krevet",
    categoryName: "Kreveti",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    rating: 4.9,
    reviewCount: 76,
    features: [
      "Integrirani noćni stolovi sa soft-close skočnim pločama",
      "Integrirano LED osvjetljenje sa dimmer upravljanjem",
      "Drvena osnova sa veneer finish",
      "Platforma dizajn - nema potrebe za boks oprugom",
      "Kabelski upravljački sistem za punjenje uređaja",
      "Prilagodljiva glava visina",
    ],
    dimensions: [
      { name: "Širina", value: "200 cm" },
      { name: "Dužina", value: "220 cm" },
      { name: "Visina", value: "100 cm (glava)" },
      { name: "Širina noćnog stola", value: "40 cm (svaki)" },
      { name: "Visina platforme", value: "35 cm" },
    ],
    colors: [
      { name: "Drvena osnova - svijetla", hex: "#5C4033" },
      { name: "Drvena osnova - tamna", hex: "#D2B48C" },
      { name: "Drvena osnova - tamna", hex: "#292929" },
    ],
    materials: ["Solid Oak", "Oak Veneer", "Premium Hardware"],
    careInstructions:
      "Očistite drvenu površinu s malim, vodotopivim rješenjem ili suhim čišćenjem ako je potrebno. Sušite odmah s malim, tvrdim čističem. Izbjegavajte postavljanje kreveta direktno na sunce kako bi se spriječio pucavost. Provjerite i zategnite hardware redovito.",
    reviews: [
      {
        author: "Jelena.",
        rating: 5,
        date: "March 30, 2025",
        content:
          "Ovaj krevet je potpuno transformirao našu cijelu spavaću sobu! Integrirani noćni stolovi spašavaju mnogo prostora, i LED osvjetljenje stvara savršenu atmosferu za čitanje noću. Izvrsno zadovoljni sa ovom kupnjom.",
      },
      {
        author: "Jovan.",
        rating: 5,
        date: "February 12, 2025",
        content:
          "Izvrsna kvaliteta i dizajn. Sastavljanje je trajalo neko vrijeme, ali instrukcije su bile jasne. Integrirano osvjetljenje je tako pametan detalj, i noćni stolovi su dovoljno prostori za sve moje noćne potrebe.",
      },
      {
        author: "Lara.",
        rating: 4,
        date: "January 25, 2025",
        content:
          "Elegantan krevet koji se osjeća vrlo luksuzan. Jedina razloga za 4 zvjezdice je da je jedan od LED osvjetljenja imao problem, ali klijentska podrška je poslala zamjenski dio brzo.",
      },
    ],
  },

  // ----------------------------------------
  // SOFAS
  // ----------------------------------------

  // Malmo Sofa
  {
    id: 6,
    name: "Malmo Ugaona garnitura",
    price: 2999,
    description: "Tri-seater ugaona garnitura sa dubokim sjedalima i pufnim kancelijama za maksimalnu udobnost.",
    fullDescription:
      "Malmo Ugaona garnitura kombinira savremeni dizajn sa izvrsnom udobnošću, stvarajući savršeni centar za vaš životni prostor. Njegove generozne proporcije i duboke sjedala pozivaju na odmor, dok pufne kancelije nude savršenu ravnotežu između podrške i mekšine. Čiste linije i podignute noge daju ovom ugaonici svjetlu, vazdušnu izgled iako je velika. Obojena u premium materijal, Malmo je i lep i trajna, dizajnirana da održava svoj izgled i udobnost godinama.",
    category: "ugaona-garnitura",
    categoryName: "Ugaone garniture",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    rating: 4.8,
    reviewCount: 115,
    features: [
      "Ugaona garnitura sa generoznim proporcijama",
      "Duboka sjedala (65 cm) za maksimalnu udobnost",
      "Pufne kancelije sa visokom elastičnošću",
      "Drvena osnova za trajnost",
      "Mijenjajuća i obrnuta sjedala",
      "Stain-resistant tkanina",
      "Podignute noge za lako čišćenje ispod",
    ],
    dimensions: [
      { name: "Širina", value: "220 cm" },
      { name: "Dubina", value: "95 cm" },
      { name: "Visina", value: "85 cm" },
      { name: "Visina sjedala", value: "45 cm" },
      { name: "Dubina sjedala", value: "65 cm" },
      { name: "Visina ruku", value: "65 cm" },
      { name: "Visina noge", value: "15 cm" },
    ],
    colors: [
      { name: "Svetlo siva", hex: "#D3D3D3" },
      { name: "Tamna siva", hex: "#696969" },
      { name: "Navy plava", hex: "#000080" },
      { name: "Bež", hex: "#F5F5DC" },
      { name: "Siva", hex: "#9CAF88" }, 
    ],
    materials: ["Drvena osnova", "Pufna osnova", "Pufna kancelija", "Premium tkanina"],
    careInstructions:
      "Očistite drvenu površinu s malim, vodotopivim rješenjem ili suhim čišćenjem ako je potrebno. Sušite odmah s malim, tvrdim čističem. Izbjegavajte postavljanje kreveta direktno na sunce kako bi se spriječio pucavost. Provjerite i zategnite hardware redovito.",
    reviews: [
      {
        author: "Tomaš.",
        rating: 5,
        date: "April 5, 2025",
        content:
          "Ova ugaona garnitura je apsolutno izvrsna! Savršena je kombinacija stila i udobnosti. Duboka sjedala su savršena za odmor s knjigom, i tkanina se osjeća luksuzna i trajna. Svi koji posjećuju komentiraju kako je lep.",
      },
      {
        author: "Lara.",
        rating: 4,
        date: "March 12, 2025",
        content:
          "Vrlo udobna ugaona garnitura sa izvrsnom kvalitetom. Pufne kancelije su savršena ravnoteža između mekšine i podrške. Jedina razloga za 4 zvjezdice umjesto 5 je da je boja malo drugačija nego što je bila na slikama.",
      },
      {
        author: "Jovan.",
        rating: 5,
        date: "February 28, 2025",
        content:
          "Vrijedan svake marke! Ova ugaona garnitura je potpuno transformirala naš životni prostor i postala svima najdraži mjesto. Tkanina je održava lep i čak i sa dječjima i psima. Nije moguće bolje zadovoljstvo sa ovom kupnjom.",
      },
    ],
  },

  // ----------------------------------------
  // PANEL FURNITURE
  // ----------------------------------------

  {
    id: 8,
    name: "Gothenburg Ugaona garnitura",
    price: 3499,
    description: "Vremenski otporni ugaoni namještaj za vanjski odmor.",
    fullDescription:
      "Gothenburg Ugaona garnitura donosi eleganciju i kvalitetu unutarnjeg namještaja na vaš vanjski prostor. Ovaj kompletan ugaoni namještaj uključuje stol, i šest stolica, sve izrađene od vremenski otpornih materijala dizajniranih da izdrže elemente dok održavaju svoju ljepotu. Minimalistički skandinavski dizajn ima čiste linije i neutralnu paletu boja koja se uklapa u bilo koji vanjski prostor. Savršen za alfresco jelo, zabavu, ili jednostavno uživanje u jutarnjem kafiću u svježem zraku, ova garnitura kombinira stil, udobnost i trajnost.",
    category: "ugaona-garnitura",
    categoryName: "Ugaone garniture",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    rating: 4.5,
    reviewCount: 67,
    features: [
      "Vremenski otporni materijali",
      "Kompletan set uključuje stol i šest stolica",
      "Minimalistički skandinavski dizajn",
      "Čiste linije i neutralna paleta boja",
      "Savršen za vanjski odmor",
    ],
    dimensions: [
      { name: "Širina garniture", value: "180 cm" },
      { name: "Dubina garniture", value: "90 cm" },
      { name: "Visina garniture", value: "75 cm" },
      { name: "Širina garniture", value: "75 cm" },
      { name: "Dubina garniture", value: "80 cm" },
      { name: "Visina garniture", value: "85 cm" },
      { name: "Težina", value: "120 kg" },
    ],
    colors: [
      { name: "Natural Oak", hex: "#D2B48C" },
      { name: "Smoked Oak", hex: "#8B4513" },
      { name: "White Oak", hex: "#F5F5F5" },
    ],
    materials: ["Vremenski otporni drvo", "Vremenski otporni tkanina"],
    careInstructions:
      "Očistite drvenu površinu s malim, vodotopivim rješenjem ili suhim čišćenjem ako je potrebno. Sušite odmah s malim, tvrdim čističem. Izbjegavajte postavljanje kreveta direktno na sunce kako bi se spriječio pucavost. Provjerite i zategnite hardware redovito.",
    reviews: [
      {
        author: "Tomaš.",
        rating: 5,
        date: "April 15, 2025",
        content:
          "Ova vanjska garnitura je promjena! Izvrsna je udobnost i materijali su izvrsni. Savršen za naše ljetne sastanke.",
      },
      {
        author: "Jovan.",
        rating: 4,
        date: "March 22, 2025",
        content:
          "Lep garnitura sa izvrsnom kvalitetom. Vremenski otporni materijali su ogroman plus. Samo 4 zvjezdice jer sastavljanje nije bilo baš jednostavno.",
      },
      {
        author: "Lara.",
        rating: 5,
        date: "February 17, 2025",
        content:
          "Vrijedan svake marke! Ova vanjska garnitura je postala naša najdraža mjesta za ljetne barbecue. Dizajn je elegantan i materijali su trajni.",
      },
    ],
  },
  {
    id: 9,
    name: "Helsingborg Kafe stol",
    price: 799,
    description: "Minimalistički kafe stol sa maram površinom i drvenim nogu.",
    fullDescription: "Helsingborg Kafe stol kombinira luksuz i minimalizam sa svojom stolovnom površinom od marama i drvenim nogu. Stolovi su čisti i kombiniraju različite materijale, stvarajući sofisticirani centar za bilo koju dnevnu sobu. Posebno odabrana marama površina ima jedinstvene prirodne uzorke, dok drvene nogu pružaju stabilnu podršku i topli kontrast.",
    category: "stol",
    categoryName: "Stolovi",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800"
    ],
    rating: 4.6,
    reviewCount: 45,
    features: [
      "Prirodna maram površina",
      "Drvena osnova",
      "Zaštitni felt pads",
      "Jednostavan sastavljanje",
      "Stain-resistant marble coating"
    ],
    dimensions: [
      { name: "Širina", value: "120 cm" },
      { name: "Dubina", value: "60 cm" },
      { name: "Visina", value: "45 cm" },
      { name: "Težina", value: "35 kg" }
    ],
    colors: [
      { name: "White Marble/Natural Oak", hex: "#FFFFFF" },
      { name: "Black Marble/Natural Oak", hex: "#000000" }
    ],
    materials: ["Marble", "Solid Oak"],
    careInstructions: "Očistite maram površinu s malim, vodotopivim rješenjem ili suhim čišćenjem ako je potrebno. Sušite odmah s malim, tvrdim čističem. Izbjegavajte postavljanje kreveta direktno na sunce kako bi se spriječio pucavost. Provjerite i zategnite hardware redovito.",
    reviews: [
      {
        author: "Sofija N.",
        rating: 5,
        date: "March 28, 2025",
        content: "Lep kafe stol! Maram površina je impresivan i drvena osnova ga savršeno dopunjuje. Vrlo stabilan i dobro izrađen."
      },
      {
        author: "Jovan.",
        rating: 4,
        date: "February 15, 2025",
        content: "Izvrsna kvaliteta i izgleda upravo kao na slici. Sastavljanje je bilo jednostavno. Samo 4 zvjezdice jer je teži nego što sam očekivao."
      }
    ]
  },
  {
    id: 10,
    name: "Kiruna stol s lampom",
    price: 349,
    oldPrice: 449,
    description: "Prilagodljivi stol sa lampom sa brončanim detaljima i tkanom šeširom.",
    fullDescription: "Kiruna stol s lampom kombinira funkcionalnost sa elegantnim dizajnom. Prilagodljiva ruka i visina omogućuju savršenu poziciju, dok su brončani detalji dodaju dodir luksuzu. Prirodna tkanina šešira raspršuje svjetlost savršeno, stvarajući topli i upijajući atmosferu u bilo kojoj sobi.",
    category: "stol",
    categoryName: "Stolovi",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800"
    ],
    rating: 4.8,
    reviewCount: 56,
    features: [
      "Prilagodljiva ruka i visina",
      "Brončani detalji",
      "LED kompatibilan",
      "Integrirana dimmerska sklopka"
    ],
    dimensions: [
      { name: "Širina osnove", value: "30 cm" },
      { name: "Širina šešira", value: "45 cm" },
      { name: "Maksimalna visina", value: "180 cm" },
      { name: "Dužina kabela", value: "200 cm" }
    ],
    colors: [
      { name: "Prirodna boja drveta/Brončani", hex: "#F5F5DC" },
      { name: "Siva boja drveta/Brončani", hex: "#808080" }
    ],
    materials: ["Brončani", "Drvena osnova", "Čelična osnova"],
    careInstructions: "Očistite drvenu površinu s malim, vodotopivim rješenjem ili suhim čišćenjem ako je potrebno. Sušite odmah s malim, tvrdim čističem. Izbjegavajte postavljanje kreveta direktno na sunce kako bi se spriječio pucavost. Provjerite i zategnite hardware redovito.",
    reviews: [
      {
        author: "Sofija N.",
        rating: 5,
        date: "April 1, 2025",
        content: "Ova lampa je i lepa i funkcionalna. Prilagodljiva ruka je savršena za čitanje, i dimmerska sklopka dodaje odličnu atmosferu."
      },
      {
        author: "Jovan.",
        rating: 4,
        date: "March 10, 2025",
        content: "Izvrsna kvaliteta i dizajn. Brončani detalji su impresivan. Sastavljanje je bilo malo komplicirano, ali vrijedno."
      }
    ]
  },
  {
    id: 11,
    name: "Luleå strana stol",
    price: 399,
    description: "Stol sa skrivenim skladištenjem",
    fullDescription: "Luleå strana stol je pametan rješenje za modernu život, kombinirajući stil sa funkcionalnošću. Skriveni prostor za skladištenje je savršen za održavanje uređaja u životnom prostoru, dok su čiste linije i kombinacija materijala stvaraju kontemporistični dizajn koji radi u bilo kojoj sobi.",
    category: "stol",
    categoryName: "Stolovi",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800"
    ],
    rating: 4.7,
    reviewCount: 38,
    features: [
      "Skriveni prostor za skladištenje",
      "Mehanički zatvori",
      "Anti-tip dizajn",
      "Felt-lined storage",
      "Ne-markirajuće noge"
    ],
    dimensions: [
      { name: "Širina", value: "45 cm" },
      { name: "Visina", value: "55 cm" },
      { name: "Dubina skladištenja", value: "15 cm" },
      { name: "Težina", value: "8 kg" }
    ],
    colors: [
      { name: "Bijela/Prirodna drvena osnova", hex: "#FFFFFF" },
      { name: "Crna/Prirodna drvena osnova", hex: "#000000" },
      { name: "Siva/Prirodna drvena osnova", hex: "#9CAF88" }
    ],
    materials: ["Drvena osnova", "Površinsko obojena čelična osnova", "Felt"],
    careInstructions: "Očistite drvenu površinu s malim, vodotopivim rješenjem ili suhim čišćenjem ako je potrebno. Sušite odmah s malim, tvrdim čističem. Izbjegavajte postavljanje kreveta direktno na sunce kako bi se spriječio pucavost. Provjerite i zategnite hardware redovito.",
    reviews: [
      {
        author: "Sofija N.",
        rating: 5,
        date: "March 20, 2025",
        content: "Savršena veličina i skriveni prostor je super koristan! Soft-close mehanizam je lijep dodir. Veoma zadovoljan sa ovom kupnjom."
      },
      {
        author: "Jovan.",
        rating: 4,
        date: "February 5, 2025",
        content: "Odličan mali stol sa pametnim skladištenjem. Sastavljanje je bilo jednostavno i kvaliteta je izvrsna."
      }
    ]
  },

]

export const getAllProducts = (): Product[] => {
  return products
}

export const getProductById = (id: number): Product | undefined => {
  return products.find((product) => product.id === id)
}

export const getRelatedProducts = (id: number): Product[] => {
  const product = products.find((product) => product.id === id)
  if (!product) {
    return []
  }
  return products.filter((p) => p.category === product.category && p.id !== id).slice(0, 4)
}
