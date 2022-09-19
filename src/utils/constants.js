// This will be used to fetch MG cities
const IBGE_LOCALIDADES_BASE_URL =
  'https://servicodados.ibge.gov.br/api/v1/localidades';
const MG = 31;

const FIRST_PAGE = 1;
const SECOND_PAGE = 2;
const THIRD_PAGE = 3;
const FOURTH_PAGE = 4;
const FIFTH_PAGE = 5;
const SIXTH_PAGE = 6;
const DATA_ITEMS_PER_PAGE = 1;
const REGISTER_TOTAL_PAGES = 2;
const REGISTER_STARTUP_TOTAL_PAGES = 4;
const REGISTER_ORGANIZATION_TOTAL_PAGES = 6;

// Common consts
const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean massa elit, faucibus vitae efficitur ac, tempor vel enim. Nam cursus, eros eget suscipit ultrices, leo ex sagittis justo, et tincidunt odio metus et tortor. Aenean tortor dolor, ultrices in justo et, condimentum faucibus libero. Sed sit amet vestibulum est, sit amet mollis turpis. Vivamus convallis dui at orci scelerisque blandit. Praesent porta magna eros, eget vulputate ipsum bibendum quis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent accumsan cursus erat quis fermentum. Pellentesque metus velit, interdum et mollis eget, viverra vel massa. Cras sit amet ipsum condimentum urna tincidunt ultrices ut aliquet lorem.';

const INPUT_NAMES = {
  name: 'name',
  description: 'description',
  linkedin: 'linkedin',
  mail: 'mail',
  website: 'website',
};

const STAGES = [
  {
    value: 'ideation',
    label: 'Ideação',
    info:
      'fase de concepção da ideia até consolidação do Mínimo Produto Viável - MVP para um nicho de mercado específico.',
  },
  {
    value: 'operation',
    label: 'Operação',
    info:
      'fase em que a startup atua de forma a consolidar um número considerável de primeiros clientes, mas ainda sem processos definidos.',
  },
  {
    value: 'traction',
    label: 'Tração',
    info:
      'fase de início da consolidação e repetição de processos para áreas da startup, como vendas, marketing, recursos humanos, sucesso do cliente etc.',
  },
  {
    value: 'scale',
    label: 'Escala',
    info:
      'fase onde a startup possui taxas de crescimento elevadas, já possui processos mais estruturados e busca se expandir para novas praças, como públicos, localidades, segmentos, etc.',
  },
  {
    value: 'consolidated',
    label: 'Consolidada no mercado',
    info:
      'fase onde a startup é um dos principais líderes no mercado em que atua e já construiu barreiras à entrada relevantes.',
  },
];

const DEFAULT_INFO_MODAL_CONFIGS = {
  style: { top: 20 },
};

const REQUIRED_MSG = 'Campo obrigatório';

// Register consts
const CATEGORIES = {
  bigCompanies: 'Grandes Empresas',
  investors: 'Investidores',
  accelerator: 'Aceleradora',
  startup: 'Startup',
};

// Startup register flow specific consts
const STARTUP_CONNECTION_PREFS = [
  'headOfficeCity',
  'stage',
  'dificulties',
  'developments',
];

const DIFICULTIES = [
  { value: 'capital', label: 'Acesso a capital' },
  { value: 'clients', label: 'Acesso a clientes' },
  { value: 'talents', label: 'Acesso a talentos' },
  { value: 'competition', label: 'Competição acirrada no mercado' },
  { value: 'development', label: 'Desenvolvimento do produto' },
  { value: 'none', label: 'Nenhum/Indiferente' },
];

const DEVELOPMENTS = [
  { value: 'ace_startups', label: 'ACE STARTUPS' },
  { value: 'acelera_mgti', label: 'Acelera MGTI' },
  { value: 'agita_sebrae', label: 'Agita Sebrae' },
  { value: 'agroup', label: 'AgroUp' },
  { value: 'ahk', label: 'AHK' },
  { value: 'artemisia', label: 'Artemisia' },
  { value: 'avanca_cafe', label: 'Avança Café' },
  { value: 'baanko_challenge', label: 'Baanko challenge' },
  { value: 'biominas_hub', label: 'Biominas HUB' },
  { value: 'biostartup_lab', label: 'Biostartup Lab' },
  { value: 'biotechtown', label: 'BiotechTown' },
  { value: 'bmg_uptech', label: 'BMG Uptech' },
  { value: 'brazillab', label: 'Brazillab' },
  {
    value: 'campo_lab_goiania_e_agrihub_cuiaba',
    label: 'Campo Lab - Goiânia e AgriHub - Cuiabá',
  },
  { value: 'campus_mobile', label: 'Campus Mobile' },
  { value: 'cientec_aceleradora', label: 'Cientec Aceleradora' },
  { value: 'cnpq', label: 'CNPq' },
  { value: 'conecta', label: 'Conecta' },
  {
    value: 'conexao_startup_industria_abdi',
    label: 'Conexão Startup Indústria (ABDI)',
  },
  { value: 'construtech_ventures', label: 'Construtech Ventures' },
  { value: 'costart', label: 'Costart' },
  { value: 'cotemig_startups', label: 'COTEMIG Startups' },
  { value: 'darwin_startups', label: 'Darwin Startups' },
  {
    value: 'desafio_senai_firjan_ternium_rj',
    label: 'Desafio SENAI-Firjan - Ternium (RJ)',
  },
  { value: 'edital_senai_novacao', label: 'Edital Senai Inovação' },
  { value: 'empreenda-santander_agita', label: 'Empreenda Santander - Agita' },
  { value: 'energy_nest', label: 'Energy Nest' },
  { value: 'estacao_hack_na_estrada', label: 'Estação Hack na Estrada' },
  { value: 'fcj_venture_builder', label: 'FCJ Venture Builder' },
  { value: 'fetin', label: 'FETIN' },
  { value: 'fiemg_lab', label: 'FIEMG Lab' },
  { value: 'finep_senai_inovacao', label: 'Finep - Senai Inovação' },
  { value: 'founder_institute', label: 'Founder Institute' },
  { value: 'game_founders', label: 'Game Founders' },
  { value: 'gerdau_challenge', label: 'Gerdau Challenge' },
  { value: 'ginga', label: 'Ginga' },
  { value: 'go_minas', label: 'Go Minas' },
  {
    value: 'google_launchpad_accelerator',
    label: 'Google Launchpad Accelerator',
  },
  {
    value: 'gran_pix_senai_de_novacao_segunda_edicao',
    label: 'Gran Pix Senai de Inovação - 2ª Edição',
  },
  { value: 'hubble', label: 'Hubble' },
  { value: 'idexo', label: 'IDEXO' },
  { value: 'impact_hub', label: 'Impact Hub' },
  { value: 'incit', label: 'INCIT' },
  {
    value: 'incubadora_inatel',
    label: 'Incubadora INATEL - Santa Rita do Sapucaí - MG',
  },
  { value: 'inovai', label: 'INOVAI' },
  { value: 'inovativa', label: 'InovAtiva' },
  { value: 'itajuba_hardtech', label: 'Itajubá HardTech' },
  { value: 'kyvo', label: 'Kyvo' },
  { value: 'lab001', label: 'Lab001' },
  { value: 'midas', label: 'Laboratório de Negócios MIDAS' },
  { value: 'lemonade', label: 'Lemonade' },
  { value: 'liga_ventures', label: 'Liga Ventures' },
  { value: 'mining_hub', label: 'Mining Hub' },
  { value: 'mininglab', label: 'MiningLab' },
  { value: 'nascente_cefet_mg', label: 'Nascente CEFET-MG' },
  {
    value: 'nucleo_de_empreendedorismo_inatel',
    label:
      'Núcleo de Empreendedorismo do Instituto Nacional de Telecomunicações (Inatel)',
  },
  {
    value: 'pre_incubacao_do_centev_ufv',
    label: 'Pré-Incubação do CENTEV/UFV',
  },
  { value: 'procel_edifica', label: 'Procel Edifica' },
  { value: 'prointec', label: 'PROINTEC' },
  { value: 'puctec', label: 'Puctec' },
  { value: 'raja_valley', label: 'Raja Valley' },
  { value: 'raja_ventures', label: 'Raja Ventures' },
  { value: 'samsung_creative_startups', label: 'Samsung Creative Startups' },
  { value: 'scaleup_endeavor', label: 'ScaleUp Endeavor' },
  { value: 'sebraetec', label: 'Sebraetec' },
  { value: 'seed', label: 'SEED' },
  {
    value: 'sindseg_insurtech_connection',
    label: 'SindSeg Insurtech Connection',
  },
  { value: 'startout', label: 'STARTOUT' },
  { value: 'startup_brasil', label: 'Startup Brasil' },
  { value: 'startup_chile', label: 'Start-Up Chile' },
  { value: 'startup_industria_abdi', label: 'Startup Indústria - ABDI' },
  { value: 'ycombinator', label: 'Startup School do YCombinator' },
  { value: 'startup_tech', label: 'Startup Tech' },
  {
    value: 'tech_start_agro_digital_embrapa_venture_hub',
    label: 'Tech Start Agro Digital - Embrapa/Venture Hub',
  },
  { value: 'techmall', label: 'Techmall' },
  { value: 'thought_for_food', label: 'Thought For Food' },
  { value: 'troposlab', label: 'Troposlab' },
  { value: 'uf_hub', label: 'UF HUB (UNIVERSIDADE DA FLORIDA)' },
  { value: 'visa', label: 'Visa' },
  { value: 'wayra', label: 'Wayra' },
  { value: 'wow', label: 'WOW' },
  { value: 'xrbr_canada', label: 'XRBR Canadá' },
  { value: 'none', label: 'Nenhum/Indiferente' },
];

// Organization register flow specific consts
const EBT_CONNECTION_PREFS = [
  'stages',
  'segments',
  'technologies',
  'businessModels',
  'clientSegmentations',
  'investmentPhases',
];

const SEGMENTS = [
  { value: 'aerospace', label: 'Aeroespacial' },
  { value: 'agribusiness', label: 'Agronegócio' },
  { value: 'foods', label: 'Alimentos' },
  { value: 'automobiles', label: 'Automóveis' },
  { value: 'smartCities', label: 'Cidades inteligentes' },
  { value: 'biologicalSciences', label: 'Ciências biológicas' },
  { value: 'construction', label: 'Construção' },
  { value: 'right', label: 'Direito' },
  { value: 'educacation', label: 'Educação' },
  { value: 'energy', label: 'Energia' },
  { value: 'entertainment', label: 'Entretenimento' },
  { value: 'sport', label: 'Esporte' },
  { value: 'finances', label: 'Finanças' },
  { value: 'businessManagement', label: 'Gestão de Negócios' },
  { value: 'wasteManagement', label: 'Gestão de resíduos' },
  { value: 'riskManagement', label: 'Gestão de riscos' },
  { value: 'government', label: 'Governo' },
  { value: 'properties', label: 'Imóveis' },
  { value: 'industry4', label: 'Indústria 4.0' },
  { value: 'games', label: 'Jogos' },
  { value: 'logistics', label: 'Logística' },
  { value: 'mining', label: 'Mineração' },
  { value: 'mobility', label: 'Mobilidade' },
  { value: 'fashion', label: 'Moda' },
  { value: 'socialBusiness', label: 'Negócios Sociais' },
  { value: 'pet', label: 'Pets' },
  { value: 'privacyTech', label: 'PrivacyTech' },
  { value: 'publicity', label: 'Publicidade' },
  { value: 'recycle', label: 'Reciclagem' },
  { value: 'humanResources', label: 'Recursos Humanos' },
  { value: 'socialNetwork', label: 'Rede Social' },
  { value: 'regulamentation_compliance', label: 'Regulamentação e compliance' },
  { value: 'health', label: 'Saúde' },
  { value: 'security', label: 'Segurança' },
  { value: 'insurance', label: 'Seguros' },
  { value: 'sustentability', label: 'Sustentabilidade' },
  { value: 'ti', label: 'Tecnologia da informação' },
  { value: 'tourism', label: 'Turismo' },
  { value: 'retail', label: 'Varejo' },
  { value: 'sales', label: 'Vendas' },
  { value: 'none', label: 'Nenhum/Indiferente' },
];

const TECHNOLOGIES = [
  { value: 'rpa', label: 'Aeronaves Remotamente Pilotadas' },
  { value: 'geneticAnalysis', label: 'Análise genética' },
  { value: 'apis', label: "API's" },
  { value: 'mobileApp', label: 'Aplicação Mobile' },
  { value: 'industrialAutomation', label: 'Automação Industrial' },
  { value: 'bigData', label: 'Big Data' },
  { value: 'biomolecules', label: 'Biomoléculas' },
  { value: 'bioprocesses', label: 'Bioprocessos' },
  { value: 'biotechnology', label: 'Biotecnologia' },
  { value: 'blendedLearning', label: 'Blended Learning' },
  { value: 'blockchain', label: 'Blockchain' },
  { value: 'chatbot', label: 'Chatbot' },
  { value: 'cloudComputing', label: 'Computação em nuvem' },
  { value: 'deepLearning', label: 'Deep Learning' },
  { value: 'drone', label: 'Drones' },
  { value: '3dprint', label: 'Impressão 3D' },
  { value: 'ia', label: 'Inteligência artificial' },
  { value: 'iot', label: 'IOT (Internet das Coisas)' },
  { value: 'machineLearning', label: 'Machine Learning' },
  { value: 'mobileVision', label: 'Mobile Vision' },
  { value: 'nanotechnology', label: 'Nanotecnologia' },
  { value: 'naturalLanguageProcessing', label: 'Natural Language Processing' },
  { value: 'cloud', label: 'Nuvem' },
  { value: 'augmentedReality', label: 'Realidade Aumentada' },
  { value: 'virtualReality', label: 'Realidade Virtual' },
  { value: 'robotics', label: 'Robótica' },
  { value: 'computationalVision', label: 'Visão Computacional' },
  { value: 'voicebots', label: 'Voicebots' },
  { value: 'none', label: 'Nenhum/Indiferente' },
];

const BUSINESS_MODELS = [
  {
    value: 'ads',
    label: 'Anúncios',
    info:
      'produtos e serviços são fornecidos gratuitamente, mas acompanhados de anúncios pagos pelos patrocinadores identificados.',
  },
  {
    value: 'subscription',
    label: 'Assinatura',
    info: 'receitas recorrentes através de compras repetidas.',
  },
  {
    value: 'basedOnUse',
    label: 'Baseado em Uso',
    info:
      'precificação do serviço é baseada no uso de um cliente durante um determinado período, denominado pelo que é o serviço da empresa (ex.: valor por uso de API, etc).',
  },
  {
    value: 'ecommerce',
    label: 'E-Commerce',
    info:
      'se concentra na venda de produtos, através de uma loja virtual na internet.',
  },
  {
    value: 'enterprise',
    label: 'Enterprise',
    info:
      'vende serviços ou software para outras empresas com base em uma licença única, regulados por contratos vigentes.',
  },
  {
    value: 'hardware',
    label: 'Hardware',
    info: 'vende dispositivos físicos para consumidores ou empresas.',
  },
  {
    value: 'licensing',
    label: 'Licenciamento',
    info:
      ' cobra uma taxa fixa com base no número de clientes ou um royalty (porcentagem) sobre as vendas com base  no uso do material protegido por direitos autorais.',
  },
  {
    value: 'marketplace',
    label: 'Marketplace',
    info:
      'atua como intermediário na venda de bem ou serviço entre vendedores e consumidores, geralmente cobrando taxa ou porcentagem do valor total transacionado.',
  },
  {
    value: 'saas',
    label: 'SaaS',
    info:
      'disponibiliza softwares e soluções de tecnologia como um serviço, por meio de soluções hospedadas em nuvem.',
  },
  {
    value: 'transactional',
    label: 'Transacional',
    info:
      'permite uma transação financeira em nome de um cliente e cobra uma taxa ou uma porcentagem do valor transacionado.',
  },
  {
    value: 'sellingData',
    label: 'Venda de dados',
    info:
      'envolve a coleta de dados de consumidores e a venda às empresas para que melhorem sua estratégia de marketing e de vendas. As empresas que vendem dados normalmente fazem todo o árduo trabalho de coletar, digitalizar, analisar e apresentar os dados de forma tornar mais assertiva a tomada de decisões de outros empreendedores.',
  },
  { value: 'none', label: 'Nenhum/Indiferente' },
];

const SEGMENTATIONS = [
  { value: 'b2b', label: 'B2B', info: 'empresa para empresa' },
  { value: 'b2c', label: 'B2C', info: 'empresa para consumidor' },
  {
    value: 'b2b2c',
    label: 'B2B2C',
    info:
      'consumidor para consumidor (onde há primeiramente uma relação de venda entre empresas, para só depois atingir o cliente final.',
  },
  {
    value: 'c2c',
    label: 'C2C',
    info:
      'consumidor para consumidor (onde a operação de compra e venda envolve apenas 2 consumidores. A empresa que desenvolve o negócio realiza apenas o intermédio desta transação).',
  },
  { value: 'B2G', label: 'B2G', info: 'empresa para a administração pública.' },
  { value: 'none', label: 'Nenhum/Indiferente', info: '' },
];

const INVESTMENT_PHASES = [
  {
    value: 'ownResource',
    label: 'Recurso próprio ou bootstrap',
    info: 'Investimento total até 10 mil reais.',
  },
  {
    value: 'preSeed',
    label: 'Pré-seed',
    info: 'Investimento total de 100 mil a 400 mil reais.',
  },
  {
    value: 'seed',
    label: 'Seed',
    info: 'Investimento total de 400 mil a 2 milhões de reais.',
  },
  {
    value: 'seriesA',
    label: 'Série A',
    info: 'Investimento total de 2 milhões a 7 milhões de reais.',
  },
  {
    value: 'above7Milions',
    label: 'Acima de 7 milhões de reais',
    info: '',
  },
  { value: 'none', label: 'Nenhum/Indiferente', info: '' },
];

// Security page constants
const CHANGE_PASSWORD = {
  description: 'Modifique sua senha para uma ainda melhor',
  title: 'Alterar senha',
};

const FINISH_SESSION = {
  title: 'Encerrar sessão',
  description: 'Desconecte sua conta deste dispositivo',
};

export {
  IBGE_LOCALIDADES_BASE_URL,
  MG,
  FIRST_PAGE,
  SECOND_PAGE,
  THIRD_PAGE,
  FOURTH_PAGE,
  FIFTH_PAGE,
  SIXTH_PAGE,
  REGISTER_TOTAL_PAGES,
  REGISTER_STARTUP_TOTAL_PAGES,
  REGISTER_ORGANIZATION_TOTAL_PAGES,
  DATA_ITEMS_PER_PAGE,
  STAGES,
  DIFICULTIES,
  DEVELOPMENTS,
  SEGMENTS,
  TECHNOLOGIES,
  BUSINESS_MODELS,
  SEGMENTATIONS,
  INVESTMENT_PHASES,
  DEFAULT_INFO_MODAL_CONFIGS,
  CHANGE_PASSWORD,
  FINISH_SESSION,
  REQUIRED_MSG,
  STARTUP_CONNECTION_PREFS,
  EBT_CONNECTION_PREFS,
  LOREM,
  INPUT_NAMES,
  CATEGORIES,
};
