import type { Material } from "@/lib/types";

export const MATERIALES: Material[] = [
  // ────────────────────────────────────────────────────────────────
  // Módulo 1 · Definiciones
  // ────────────────────────────────────────────────────────────────
  {
    id: "mat-m1-definiciones",
    slug: "proposito-modulo-1",
    publicadoEn: "2026-06-28",
    moduloId: "m1",
    tipo: "definiciones",
    titulo: "Propósito del Módulo 1: Liderar el Negocio",
    resumen:
      "Qué buscamos en el primer módulo: mirada compartida del momento de la División, rol del equipo de líderes y líneas de acción.",
    secciones: [
      {
        titulo: "Propósito del módulo",
        lista: [
          "Construir una mirada compartida sobre el momento actual de la División, reconociendo oportunidades y desafíos.",
          "Definir el rol del equipo de líderes en este contexto de oportunidad.",
          "Identificar barreras y líneas de acción que orienten los próximos pasos.",
        ],
      },
      {
        titulo: "Expectativas del equipo",
        parrafos: [
          "Al abrir la jornada, el equipo de líderes declaró qué espera lograr al cerrar esta jornada y el programa:",
        ],
        lista: [
          "Estandarizar un concepto de liderazgo",
          "Conocer nuevos tipos de liderazgo, que sean más motivacionales",
          "Autocuestionarnos y compartir prácticas",
          "Conocernos",
          "Aprender de otros",
          "Compartir experiencias",
          "Adquirir herramientas para lograr influenciar",
          "Aprender a tener conversaciones difíciles",
          "Entender mejor cómo liderar a nuevas generaciones",
          "Que terminemos como un grupo consolidado",
          "Ponernos metas en común",
          "Compartir con apertura y honestidad",
          "Resolver los temas que haya que resolver entre nosotros",
        ],
      },
      {
        titulo: "¿Dónde estamos hoy? — Diagnóstico (Estado A)",
        parrafos: [
          "El diagnóstico compartido de la jornada identificó cuatro focos que describen el estado actual de la División:",
        ],
        lista: [
          "Integración y cliente — Integración valorada, pero aún poco traducida en sinergias y valor conjunto. Lo que entendemos por cliente no es lo mismo.",
          "Estrategia compartida — Falta un relato común que dé sentido, foco y convicción a la integración.",
          "Coordinación y planificación — Predomina una lógica operativa y reactiva; necesitamos más espacios para planificar, anticipar y coordinar transversalmente.",
          "Conversaciones y liderazgo — Feedback y desacuerdos todavía poco trabajados en todos los sentidos: desde los equipos, entre pares y hacia arriba.",
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // Módulo 1 · Lecturas
  // ────────────────────────────────────────────────────────────────
  {
    id: "mat-m1-lecturas",
    slug: "liderazgo-adaptativo",
    publicadoEn: "2026-06-28",
    moduloId: "m1",
    tipo: "lecturas",
    titulo: "Liderazgo Adaptativo",
    resumen:
      "Lectura de referencia del programa: quiénes ejercen liderazgo, problemas técnicos vs. adaptativos y la habilidad de subirse al balcón.",
    secciones: [
      {
        titulo: "¿Quiénes ejercen liderazgo?",
        parrafos: [
          "Hablar de liderazgo nos hace preguntarnos si somos líderes. Como primera respuesta rápida, podrías conformarte con asentir a ello, dado que el rol formal que tienes en la organización está a cargo de un equipo o está al mando de un proyecto en particular. Entonces, quizás, la pregunta que vale la pena hacerse es la siguiente: ¿has ejercido liderazgo? Para saberlo, pregúntate lo siguiente: ¿Cuántas veces has sentido que estás en una reunión en la que se evitan los temas realmente importantes y te has decidido a decirlo? ¿Cuántas veces has tenido una buena idea que proponer y te has hecho oír a pesar de que tu jefe “sabe lo que se tiene que hacer”? ¿Cuántas veces has permitido que la gente que tienes a tu cargo cuestione el modo como se hacen las cosas?",
          "Todos estamos en condiciones de ejercer liderazgo, desde cualquier rol. Lo más importante es tener la decisión y la valentía. El liderazgo es una actividad que comprende ciertas habilidades que se pueden aprender. Este aprendizaje es decisivo cuando trabajamos con personas. Muchas veces de eso depende el éxito o el fracaso de nuestro trabajo.",
          "En concreto, ejercer liderazgo es movilizar personas hacia un objetivo beneficioso. Esto no es nada fácil. Las dificultades las hemos experimentado todos más de alguna vez en la vida. Piensa nada más en los problemas que surgieron en tu área estas dos últimas semanas. ¿Cuántos pudiste resolver? Aquellos que costó más, ¿de qué dependía su éxito? Probablemente debiste lograr que algunas personas hicieran ciertas cosas. Lograr que las personas hagan lo que saben que tienen que hacer no es tan difícil, especialmente si saben cómo hacerlo. Pero hay muchas situaciones más complejas que ésta.",
          "Pongamos un ejemplo: has recibido instrucciones que no entiendes bien. ¿Qué haces? Si te quejas pensando que deberían ser más claros contigo, no has ejercido liderazgo; te has quedado callado evitando una incomodidad. Así evitas enfrentar el problema. Ejercer liderazgo en este caso significa decir que necesitas mayor claridad. Si lo haces, te estás haciendo responsable de los problemas que surgen por no poderte hacer cargo de lo que te piden. Otro caso: descubres un problema que está en otra área de tu empresa, se lo comentas al jefe respectivo pero éste no hace nada. Quizás te preguntes ¿por qué hacerte responsable de un problema que no es de tu área? La razón es obvia: el problema debe ser tratado porque de una forma u otra afecta a la empresa en su conjunto.",
        ],
      },
      {
        titulo: "¿Qué tipo de problema es éste?",
        parrafos: [
          "Ejercer liderazgo es enfrentar a las personas al problema y lograr que se sientan responsables para buscar su solución. Pero ¿qué es un problema? Una definición breve y certera es la siguiente: un problema es la brecha o distancia entre la realidad (estado A) y las aspiraciones (estado B).",
          "Sabemos que existe un problema —y lo mismo se aplica para los desafíos— cada vez que encontramos una brecha entre la realidad y las aspiraciones, entre lo que las cosas son y lo que esperamos que sean. Esa brecha, en caso de que sintamos ese problema como propio, nos inquieta, nos tensiona y anhelamos superarla. El ejercicio de liderazgo consiste en el propósito de hacer frente a este problema, para lo cual tenemos que cambiar el estado actual de las cosas, movilizarnos nosotros y movilizar a otros. Quien no intenta hacer algo por cambiar la realidad, puede seguir quejándose toda la vida.",
          "Hay problemas fáciles y difíciles, lo sabemos. Pero esta diferencia no nos ayuda mucho. Hay otra diferenciación que, si la aprendemos a usar, nos va a ayudar muchísimo: existen dos tipos de problemas, los técnicos y los adaptativos.",
          "Para los problemas técnicos contamos siempre con una solución: conducimos nuestro auto y se para. Si no sabemos de mecánica, buscamos la ayuda del mecánico, la persona que sabe y puede solucionar el problema. El problema puede ser simple o complicado, pero existe alguien que tiene la solución. Lo mismo con otros muchos problemas: si una niña se fractura el brazo, recurrimos a un traumatólogo, el que sabe curar fracturas; si la máquina se echa a perder, llamamos al técnico correspondiente.",
          "Los problemas técnicos pueden ser de diferente gravedad y complejidad, pero la solución ya existe, la tengamos nosotros o la tenga otra persona, la autoridad correspondiente.",
          "Este no es el caso de los problemas adaptativos. Para este tipo de problemas no hay solución a la mano. ¿Qué pasa si el problema con la misma máquina se repite una y otra vez y nos damos cuenta de que el problema no lo puede solucionar el técnico, quien arregla la máquina, porque depende del mal uso que se le da? En ese caso estamos frente a un problema adaptativo.",
        ],
      },
      {
        titulo: "Problemas adaptativos: las personas son el problema y la solución",
        parrafos: [
          "¿Cuál es la diferencia? La solución no la tiene un experto; más bien depende de que las personas que usan esa máquina cambien sus hábitos. O de quien repara la máquina. De nuevo en este caso, la solución no está a la mano y tampoco es fácil, pues no bastará una orden de la autoridad correspondiente para solucionarlo. Bien lo sabemos.",
          "Cambiar hábitos no es fácil. Imaginemos el Transantiago funcionando bien el primer día, ¿habría sido fácil para quienes usan los buses adaptar de repente sus hábitos a nuevos recorridos, transbordos, uso de tarjeta bip, etc.? ¿Es un problema técnico o adaptativo? Si hay personas que deben cambiar sus hábitos, ese problema tiene aspectos adaptativos que deben trabajarse. Para eso existe el liderazgo.",
          "Es fundamental entender cuándo estamos frente a un problema adaptativo y tratarlo como tal. Debemos evitar cometer el clásico error: tratar como técnicos los problemas adaptativos. Si la causa del problema con la máquina es su mal uso, la constante reparación del técnico no resolverá los accidentes laborales. Es como someterse a un trasplante de pulmón para solucionar los problemas derivados del tabaquismo.",
          "Para solucionar el problema en sus pulmones, el fumador debe cambiar su hábito. Y esto, claro, no es fácil. Por eso es que se requiere liderazgo, porque el liderazgo consiste en enfrentar a las personas al problema. El ejemplo del fumador lo deja claro: su curación depende de él mismo, de que enfrente el hecho de que él mismo es el problema, pero también la solución. Así ocurre siempre con los problemas adaptativos: las personas son el problema, pero ellas mismas son a la vez la solución.",
          "Todo depende de que se produzca el necesario cambio. Y para producir cambios adaptativos es que se requiere de liderazgo. Arreglar la máquina no requiere de liderazgo, pero sí lo requiere el lograr que todas las personas que la usan reconozcan que la principal causa del problema son ellas mismas, por el mal uso que le dan. O si efectivamente la máquina está mala, que esto se haga saber inmediatamente. En ambos casos, modificando hábitos, el beneficio es claro: se disminuyen los accidentes laborales.",
        ],
        destacado:
          "La solución de un problema adaptativo depende de tres factores: 1. Reconocimiento de la propia responsabilidad en el problema. 2. Aprendizaje. 3. Cambio adaptativo.",
      },
      {
        titulo: "Subirse al balcón",
        parrafos: [
          "Vimos la diferencia entre los problemas técnicos y los adaptativos. Dijimos que cuando enfrentamos problemas adaptativos, a diferencia de los técnicos, no bastaba la autoridad y se necesitaba ejercer liderazgo, ya que el problema son las personas, que deben cambiar. Por ello, era fundamental enfrentar a las personas con el problema para hacerlas responsables de su solución, ya que ellas son el problema, pero también la solución.",
          "Surge ahora la pregunta de cómo ejercer liderazgo, es decir, cómo lograr que las personas se hagan responsables de los problemas que dependen de ellas —y no de las autoridades— solucionar. Si pensamos ejercer liderazgo, pensamos movilizarlas, queremos que se hagan responsables. Esto no podemos hacerlo sin las personas. Lo primero entonces es saber en qué están ellas. Esto requiere una habilidad que llamaremos subirnos al balcón.",
          "¿En qué consiste esta habilidad? Respondemos con una pregunta: ¿cómo podemos entender en qué están las personas? Esto no es fácil, pero hay algunas recetas. En primer lugar, hablamos de subirnos al balcón porque el balcón es un lugar elevado que nos da perspectiva. ¿Por qué necesitamos ganar perspectiva? Hay un dicho que lo deja muy claro: los árboles no nos permiten ver el bosque. Es muy difícil ganar perspectiva si no podemos alejarnos del día a día y nuestras preocupaciones.",
          "Esta habilidad, fundamental para ejercer liderazgo, podemos entenderla como el proceso que nos ayuda a mirar por sobre las urgencias que nos ocupan a diario para entender las cosas mejor y poder luego hacer intervenciones más inteligentes y efectivas, lo que necesitaremos si queremos movilizar a las personas.",
          "¿Por qué hablamos de subirnos al balcón y de la pista de baile? Imaginémonos en una fiesta en un gran salón. Cientos de invitados interactuando durante toda la noche, con una banda en vivo de fondo. Como un invitado más, no será fácil poder dimensionar qué cosas están pasando en los diferentes sectores de la pista de baile, más allá de nuestro radio cercano. Podríamos estar bailando toda la noche y quedarnos con la impresión de que la fiesta estuvo increíble y que todos los invitados lo estaban pasando igual de bien que tú. Sin embargo, si hubieras tenido la posibilidad de subir al segundo piso, y asomarte por un balcón, podría haber cambiado la visión que te habías creado cuando estabas bailando.",
          "Desde arriba podrías haber visto otras dinámicas que se estaban dando. Por ejemplo, un grupo de amigos sentados en un rincón del salón, molestos con la música de la banda. Algunos invitados dando vueltas de manera solitaria, cansados de buscar una pareja para bailar. Un par de personas enfrascadas en una discusión que termina con ambos en el piso dándose golpes. Un grupo discutiendo con el dueño de la fiesta porque la barra había cerrado muy temprano. Una mujer desesperada buscando su cartera perdida. Un joven en manifiesto estado de ebriedad molestando a una pareja de amigas. Y muchas otras situaciones que desde la pista de baile no hubieras tenido la posibilidad de haber visto. Lo mismo pasa en los sistemas sociales que tratamos de movilizar. Muchas veces nos centramos en nuestro metro cuadrado pero no somos capaces de mirar más allá.",
        ],
      },
      {
        titulo: "Las tres distinciones: facciones, expectativas y supuestos",
        parrafos: [
          "El ejercicio de subirnos al balcón es fundamental antes de intervenir en un sistema social. Debemos ser conscientes del estado actual (A) del sistema social para poder comprender cuál será el desafío adaptativo o trabajo que deberá realizar ese grupo para llegar al estado deseado (B). Para poder hacer un correcto diagnóstico del problema que estamos enfrentando, deberemos tomar perspectiva y poner especial atención en tres distinciones fundamentales.",
          "Primero deberemos poner atención a los distintos grupos de interés, o facciones, que se verán afectados. Por ejemplo, en un local tendremos los clientes, los proveedores, los reponedores externos y los internos, funcionarios de soporte —sea transporte, compra o capacitación—, los administradores, subadministradores, jefes de ventas, cajeras, empaquetadores, etc., y todos ellos tendrán sus propios intereses; habrá algunos compartidos y otros distintos, pudiendo incluso haber algunos incompatibles. Al subirnos al balcón deberemos ver cuáles son estas facciones y preguntarnos cuáles son los intereses que representa cada una de ellas.",
          "Cuando distinguimos las diferentes facciones presentes en cada sistema, podemos empezar a entender y analizar la segunda distinción: las diferentes expectativas que están presentes en cada una de ellas. Si dijimos que un problema era la brecha entre la realidad y las expectativas, es fundamental conocer cuáles son las expectativas que tiene cada facción, para tener claridad con respecto al tamaño de la brecha que deberemos enfrentar. Teniendo claro cuáles son esas expectativas, podremos proyectar cuáles serán las resistencias a las que nos enfrentaremos cuando nos bajemos del balcón a intervenir.",
          "Y por último, y uno de los asuntos más importantes de analizar al mirar las diferentes facciones desde el balcón, son los prejuicios o supuestos presentes en cada una de ellas. Los supuestos son ciertas verdades que nosotros establecemos y a partir de las cuales construimos la realidad. Por ejemplo, antiguamente se creía que la Tierra era plana. Los navegantes, al actuar bajo ese supuesto, realizaban sus viajes teniendo siempre la costa a la vista, ya que existía el temor a lo desconocido. ¿Qué hubiera pasado si Cristóbal Colón no hubiese cuestionado ese supuesto? Los supuestos pueden ocasionarnos problemas cuando no somos conscientes de su existencia y de cómo distorsionan la forma en que vemos la realidad. Lo importante es que debemos ser capaces de saber bajo qué supuestos operamos y cuestionarlos. Un supuesto presente podría ser el pensar que los cambios deben ser provocados desde los cargos de autoridad. Es una interpretación que podemos hacer de la realidad, pero debemos ser conscientes de que es un supuesto, el que debemos ser capaces, por lo menos, de cuestionar.",
        ],
      },
      {
        titulo: "Mirar en sistema y el balcón de uno mismo",
        parrafos: [
          "¿Qué pasa en nuestra organización ante la desvinculación de algún colaborador? Muchas veces somos incapaces de tomar perspectiva y ver más allá de los síntomas. Un jefe desea despedir a un colaborador porque no está haciendo bien su trabajo, porque no está cumpliendo sus expectativas, pero muchas veces no está mirando el tema de una manera sistémica. Y no se detiene a entender las causas de su mal desempeño. Si nos subiéramos al balcón podríamos darnos cuenta de que quizás es un problema de fondo, que la capacitación de los colaboradores no es la suficiente, que existe un mal clima laboral que impide que se desarrollen, o quizás el problema pase porque el jefe no permite que se cometan errores, y los castiga severamente. Si nos quedamos sólo enfocados en el caso puntual no seremos capaces de mirar qué es lo que verdaderamente puede estar sucediendo en el sistema social.",
          "Durante este proceso de tomar perspectiva del sistema, debemos ponernos dentro de éste, no fuera. Este es un error típico que cometemos. Si nos ponemos dentro, nos va a ayudar a entender el rol que cumplimos; hacernos la pregunta qué se espera de mí o cómo creo que soy visto por los demás puede resultar altamente provechoso para entender el rol que desempeñamos en la organización.",
          "Subirse al balcón es una herramienta que admite una distinción que no podemos dejar pasar. Existe una subida al balcón del sistema, anteriormente descrita, y otra denominada subida al balcón de uno mismo. Esta última resulta igual de importante que la primera, pero persigue un propósito distinto: conocer cuáles son nuestras limitaciones, nuestros supuestos, nuestros desafíos adaptativos personales y el sentido de propósito que tenemos en nuestra vida. Es un análisis personal que debemos hacer permanentemente, y por sobre todo, antes de intervenir en el sistema. Es un momento de autorreflexión en el que nos desdoblamos y nos analizamos a nosotros mismos.",
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // Módulo 1 · Informe de sesión
  // ────────────────────────────────────────────────────────────────
  {
    id: "mat-m1-informe",
    slug: "informe-sesion-modulo-1",
    publicadoEn: "2026-07-02",
    moduloId: "m1",
    tipo: "informe",
    titulo: "Informe de sesión — Módulo 1",
    resumen:
      "Síntesis de la jornada: diagnóstico compartido, La Gran Oportunidad, cierre en palabras del equipo y evaluación de la experiencia.",
    secciones: [
      {
        titulo: "De la pista de baile al balcón",
        parrafos: [
          "La jornada del Módulo 1 recorrió tres momentos: ¿de dónde venimos? (historia de la División), ¿dónde estamos hoy? (diagnóstico compartido) y hacia dónde avanzar (la gran oportunidad). El equipo construyó una lectura común del estado A y formuló, en sus propias palabras, el estado B al que aspira.",
        ],
      },
      {
        titulo: "Dónde estamos hoy (Estado A)",
        lista: [
          "Integración y cliente — Integración valorada, pero aún poco traducida en sinergias y valor conjunto. Lo que entendemos por cliente no es lo mismo.",
          "Estrategia compartida — Falta un relato común que dé sentido, foco y convicción a la integración.",
          "Coordinación y planificación — Predomina una lógica operativa y reactiva; necesitamos más espacios para planificar, anticipar y coordinar transversalmente.",
          "Conversaciones y liderazgo — Feedback y desacuerdos todavía poco trabajados en todos los sentidos: desde los equipos, entre pares y hacia arriba.",
        ],
      },
      {
        titulo: "La Gran Oportunidad (Estado B, consolidado)",
        parrafos: [
          "En un contexto donde la minería necesita producir más, con mayor eficiencia, menor uso de recursos, más sostenibilidad y mejores condiciones para sus personas, tenemos la oportunidad de posicionar a ANDRITZ Separation como un socio estratégico de productividad, sustentabilidad y continuidad operacional.",
          "Esto implica pasar de ofrecer equipos, servicios o soluciones digitales por separado, a construir una propuesta de valor integrada que conecte conocimiento de proceso, tecnología, datos, automatización, soporte técnico y cercanía con el cliente durante todo el ciclo de vida de sus operaciones.",
          "Podemos hacerlo porque contamos con experiencia técnica, conocimiento local del negocio minero, relaciones de confianza con nuestros clientes, capacidades digitales, respaldo global y un portafolio amplio de soluciones. Si logramos actuar más conectados, desarrollar casos de negocio sólidos y cuidar el talento que hace posible esta propuesta, podremos ayudar a nuestros clientes a producir más con menos agua, menos energía, menor exposición operacional y mejores condiciones de trabajo para sus equipos.",
        ],
      },
      {
        titulo: "El cierre, en palabras del equipo",
        parrafos: [
          "Si tuvieras que quedarte con una sola pregunta de esta jornada, ¿cuál sería?, ¿qué se llevan?",
        ],
        citas: [
          "Me llevo la importancia de ver en sistema",
          "Que nosotros podemos accionar y pensar juntos ciertas cosas",
          "Parece que todos tenemos un diagnóstico similar y todos queremos lo mismo, el challenge es cómo nos vamos a articular para hacer realidad esa gran oportunidad",
          "Ahora nos sentimos más alineados",
          "Pudimos dar un contexto claro de cómo estamos",
          "Ahora falta la arista de cómo llevar esto a cabo, cómo ejecutarlo",
          "Me quedo con el cómo lo haremos",
          "Hubo una participación bien activa, conversamos temas delicados e importantes",
          "Se trabajó con altura de miras",
          "En relación a la reunión de enero 2025 ya hay cambios que se ven, hay expectativas distintas de tiempo pero ya se ven",
          "Tenemos que hablar de las personas y los talentos, eso es lo que hace realidad la estrategia",
        ],
      },
      {
        titulo: "Evaluación de la experiencia",
        destacado:
          "¿Qué tanto recomendarías esta experiencia?: 9,08 / 10",
        citas: [
          "Me gustaron mucho las dinámicas desarrolladas, la distribución y la finalidad de cada ejercicio.",
          "Muy dinámico en términos de generar instancias de confianza para iniciar discusiones.",
          "Aún falta soltar más al equipo, pero vamos en buen camino.",
          "Me gustó mucho el trabajo grupal. Permitió alinear al equipo en pos de un objetivo.",
          "Muy buena experiencia. Solo dejarla un poco más corta para mantener la energía.",
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // Módulo 1 · Presentación
  // ────────────────────────────────────────────────────────────────
  {
    id: "mat-m1-presentacion",
    slug: "presentacion-modulo-1",
    publicadoEn: "2026-07-02",
    moduloId: "m1",
    tipo: "presentacion",
    titulo: "Presentación — Módulo 1: Liderar el Negocio",
    resumen:
      "Las láminas de la jornada: la ruta de los talleres, el diagnóstico (Estado A), La Gran Oportunidad y las definiciones estratégicas del programa.",
    pdf: {
      src: "/materiales/m1/presentacion-modulo-1.pdf",
      paginas: 22,
    },
    secciones: [],
  },

  // ────────────────────────────────────────────────────────────────
  // Módulo 2 · Presentación
  // ────────────────────────────────────────────────────────────────
  {
    id: "mat-m2-presentacion",
    slug: "presentacion-modulo-2",
    publicadoEn: "2026-07-23",
    moduloId: "m2",
    tipo: "presentacion",
    titulo: "Presentación — Módulo 2: Guiar al Equipo",
    resumen:
      "Las láminas de la jornada: problema técnico vs. adaptativo, el proceso de cambio y las pérdidas, y las claves para sostener conversaciones desafiantes y movilizadoras.",
    pdf: {
      src: "/materiales/m2/presentacion-modulo-2.pdf",
      paginas: 40,
    },
    secciones: [],
  },

  // ────────────────────────────────────────────────────────────────
  // Módulo 2 · Lecturas
  // ────────────────────────────────────────────────────────────────
  {
    id: "mat-m2-lectura-supervivencia",
    slug: "manual-supervivencia-lideres",
    publicadoEn: "2026-07-23",
    moduloId: "m2",
    tipo: "lecturas",
    titulo: "Manual de supervivencia para líderes",
    resumen:
      "Heifetz y Linsky sobre cómo sostenerse liderando el cambio adaptativo: subir al balcón, gestionar la temperatura del conflicto, situar el trabajo donde corresponde y cuidar los peligros internos.",
    pdf: {
      src: "/materiales/m2/lectura-manual-supervivencia-lideres.pdf",
      paginas: 14,
    },
    secciones: [],
  },
  {
    id: "mat-m2-lectura-conversaciones",
    slug: "conversaciones-dificiles",
    publicadoEn: "2026-07-23",
    moduloId: "m2",
    tipo: "lecturas",
    titulo: "Conversaciones difíciles",
    resumen:
      "Stone, Patton y Heen: toda conversación difícil son en realidad tres —los hechos, los sentimientos y la identidad— y manejarlas bien parte por reconocer esa estructura.",
    pdf: {
      src: "/materiales/m2/lectura-conversaciones-dificiles.pdf",
      paginas: 6,
    },
    secciones: [],
  },

  // ────────────────────────────────────────────────────────────────
  // Módulo 2 · Tareas
  // ────────────────────────────────────────────────────────────────
  {
    id: "mat-m2-tareas",
    slug: "conversacion-con-el-equipo",
    publicadoEn: "2026-07-03",
    moduloId: "m2",
    tipo: "tareas",
    titulo: "Tarea: Conversación con el Equipo",
    resumen:
      "Antes del Módulo 2: comparte el diagnóstico y La Gran Oportunidad con tu equipo, recoge su mirada y trae tus aprendizajes.",
    secciones: [
      {
        titulo: "La tarea",
        parrafos: [
          "Antes de la próxima sesión, sostén una conversación con tu equipo. Comparte el diagnóstico que construimos como líderes y La Gran Oportunidad de la División, y recoge la mirada de tu equipo: ¿cómo ven ellos el momento actual?, ¿qué agregarían o matizarían?",
        ],
        lista: [
          "Comparte con tu equipo el diagnóstico (dónde estamos hoy) y las oportunidades identificadas.",
          "Recoge su mirada usando el ejercicio de las tres columnas (más abajo).",
          "Trae al Módulo 2 tus respuestas: ¿qué me llamó la atención?, ¿qué aprendí?",
        ],
      },
      {
        titulo: "La Gran Oportunidad (consolidado) — para compartir",
        parrafos: [
          "En un contexto donde la minería necesita producir más, con mayor eficiencia, menor uso de recursos, más sostenibilidad y mejores condiciones para sus personas, tenemos la oportunidad de posicionar a ANDRITZ Separation como un socio estratégico de productividad, sustentabilidad y continuidad operacional.",
          "Esto implica pasar de ofrecer equipos, servicios o soluciones digitales por separado, a construir una propuesta de valor integrada que conecte conocimiento de proceso, tecnología, datos, automatización, soporte técnico y cercanía con el cliente durante todo el ciclo de vida de sus operaciones.",
          "Podemos hacerlo porque contamos con experiencia técnica, conocimiento local del negocio minero, relaciones de confianza con nuestros clientes, capacidades digitales, respaldo global y un portafolio amplio de soluciones. Si logramos actuar más conectados, desarrollar casos de negocio sólidos y cuidar el talento que hace posible esta propuesta, podremos ayudar a nuestros clientes a producir más con menos agua, menos energía, menor exposición operacional y mejores condiciones de trabajo para sus equipos.",
        ],
      },
      {
        titulo: "Ejercicio de tres columnas — lo que respondió el equipo de líderes",
        parrafos: [
          "Usa estas tres columnas como guía para la conversación. Como referencia, esto fue lo que emergió en la jornada del Módulo 1:",
        ],
        columnas: [
          {
            titulo: "Lo que tenemos y debemos conservar",
            items: [
              "Cuidar los recursos",
              "Ganas de crecimiento",
              "Capacitación constante",
              "Calidad de servicio post venta",
              "Espíritu innovador",
              "Marketing dirigido",
              "Desempeño de seguridad",
              "Visión comercial",
              "Conocimiento del capital humano",
              "Compartir conocimientos",
              "Impulsar buenas relaciones",
              "Compañerismo, ambiente ameno",
              "Buenas prácticas",
              "Flexibilidad laboral",
            ],
          },
          {
            titulo: "Lo que tenemos y debemos descartar",
            items: [
              "Problemas del pasado",
              "Dejar de depender del global (decisiones operativas)",
              "Dejar de esperar que las cosas pasen",
              "Los egos técnicos",
              "Dejar de ser bomberos",
              "Discursos sin fundamentos",
              "Desconfianza",
              "Zona de confort",
              "Dejar de pretender ser una empresa de tecnología y serlo",
              "Reclamos sin soluciones",
              "Trabajar como islas",
            ],
          },
          {
            titulo: "Lo que no tenemos y debemos agregar",
            items: [
              "Más presencia en marketing",
              "Aumentar la comunicación gerencial",
              "Tener un plan de desarrollo de carrera",
              "Tener reuniones de equipo de ingeniería",
              "Mantener actualizado el CRM",
              "Tener visitas periódicas a clientes",
              "Entrenar al personal",
              "Reuniones más periódicas, todos los miércoles",
              "Generar pilotos con empresas",
              "Interacción entre equipos",
              "Mejorar beneficios laborales",
              "Implementar solución completa",
              "Publicar todos los resultados",
            ],
          },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // Módulo 3 · Lecturas
  // ────────────────────────────────────────────────────────────────
  {
    id: "mat-m3-lectura-critica",
    slug: "pagar-por-ser-criticado",
    publicadoEn: "2026-08-20",
    moduloId: "m3",
    tipo: "lecturas",
    titulo: "Pagar por ser criticado",
    resumen:
      "Por qué no hay cambio sin feedback efectivo: cómo dar y recibir crítica que moviliza —tensionar sin presionar, reconocer lo positivo y hacerse cargo de una cultura de feedback.",
    pdf: {
      src: "/materiales/m3/lectura-pagar-por-ser-criticado.pdf",
      paginas: 3,
    },
    secciones: [],
  },

  // ────────────────────────────────────────────────────────────────
  // Módulo 3 · Video
  // ────────────────────────────────────────────────────────────────
  {
    id: "mat-m3-video-guardiola",
    slug: "video-pep-guardiola",
    publicadoEn: "2026-08-20",
    moduloId: "m3",
    tipo: "video",
    titulo: "Pep Guardiola y Fernando Trueba — Conversaciones sobre el futuro",
    resumen:
      "Una conversación en torno al liderazgo, el talento y las personas, para mirar el Módulo 3 —Cuidar a las Personas— desde otra vereda.",
    video: {
      src: "/materiales/m3/video-pep-guardiola.mp4",
      tipoMime: "video/mp4",
      duracion: "18 min",
    },
    secciones: [],
  },
  {
    id: "mat-m3-video-genz",
    slug: "video-motivacion-gen-z",
    publicadoEn: "2026-08-20",
    moduloId: "m3",
    tipo: "video",
    titulo: "¿Qué motiva a la Gen Z?",
    resumen:
      "Qué mueve a las nuevas generaciones en el trabajo: un insumo para pensar cómo motivar, desarrollar y sostener el talento en el Módulo 3.",
    video: {
      src: "/materiales/m3/video-motivacion-gen-z.mp4",
      tipoMime: "video/mp4",
      duracion: "11 min",
    },
    secciones: [],
  },

  // ────────────────────────────────────────────────────────────────
  // Módulo 3 · Tareas (desafío entre módulos, previo al Módulo 3)
  // ────────────────────────────────────────────────────────────────
  {
    id: "mat-m3-desafio",
    slug: "desafio-conversacion-desafiante",
    publicadoEn: "2026-07-23",
    moduloId: "m3",
    tipo: "tareas",
    titulo: "Tarea: Desafío personal entre módulos",
    resumen:
      "Antes del Módulo 3: identifica una conversación que anticipas desafiante y prepárala con lo revisado en la sesión —propósito, balcón de ti mismo y la mirada del otro— para que genere progreso.",
    secciones: [
      {
        titulo: "El desafío",
        parrafos: [
          "Identifica a alguien con quien debas tener una conversación que anticipas desafiante o compleja. Con lo revisado en la sesión, prepárala antes de sostenerla.",
        ],
      },
      {
        titulo: "Cómo preparar la conversación",
        lista: [
          "Propósito de abrir la conversación: ¿para qué quieres tenerla y qué progreso buscas?",
          "Balcón de ti mismo: tu mirada, tus supuestos, tu emoción y tu parte de responsabilidad.",
          "Cómo se posiciona el otro: su interés, su posición y su emoción frente al tema.",
          "¿Qué debieras tener en consideración para que esta conversación genere progreso?",
        ],
      },
    ],
  },
];
