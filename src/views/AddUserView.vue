<template>
    <div v-if="userDataLoaded" class="absolute inset-0 z-50">
        <div class="w-screen h-screen backdrop-brightness-50 justify-center flex overflow-y-scroll">
            <div class="flex h-fit w-[770px] flex-col mt-[73px] bg-white rounded-xl">
                <div class="flex w-full items-center bg-[rgb(0,145,255)] h-[50px] rounded-t-xl justify-between">
                    <h1 class="text-white text-md ml-3">Novo usuário</h1>
                    <button class="flex mr-3" @click="closeModal"><closeIcon /></button>
                </div>

                <div class="flex mx-[13px] flex-col">

                    <div class="flex w-full border-b-2 mt-2">
                        <span class="font-bold">Dados básicos</span> 
                    </div>

                    <div class="flex flex-row mt-4 h-full w-full items-start justify-center gap-[81px]">
                        <emptyUserPhotoIcon />
                        <div class="flex flex-col flex-grow">
                            <InputField :required="nomeInvalid" label="Nome" :value="nome" @update:modelValue="nome = $event"/>
                            <InputField label="Nome da Mãe" :value="nome_mae" @update:modelValue="nome_mae = $event"/>
                            <InputField label="Nome do Pai" :value="nome_pai" @update:modelValue="nome_pai = $event"/>
                        </div>
                    </div>

                    <div class="flex gap-2 flex-row">
                        <!-- CPF -->
                        <InputField :required="cpfInvalid" label="CPF" class="w-[180px]" :value="cpf_cnpj" @update:modelValue="cpf_cnpj = $event"/>

                        <!-- Menu de dropdown pro estado civil -->
                        <DropDownMenu :required="estado_civilInvalid" label="Estado Civil" class="w-[180px]" :selectedValue="estado_civil" @update:modelValue="estado_civil = $event">
                            <option v-for="(status, index) in civilStatusOptions" :key="index">{{ status.label }}</option>
                        </DropDownMenu>
                    
                        <!-- Calendario -->
                        <div class="flex flex-col">
                            <span class="text-sm text-[#00000080]"> Data de nascimento </span>
                            <VueDatePicker model-value="birthdate" locale="pt-BR" class="w-[180px]" @update:model-value="formatDate">
                                <template #trigger>
                                    <button class="flex gap-6 items-center w-full border h-[38px] rounded-lg"><calendarIcon class="ml-1" />{{ data_nascimento }}</button>
                                    <span v-if="data_nascimentoInvalid" class="text-[10px] text-red-500">Campo obrigatório</span>
                                </template>
                            </VueDatePicker>
                        </div>

                        <!-- Apelido-->
                        <InputField label="Apelido" class="w-[180px]" :value="apelido" @update:modelValue="apelido = $event"/>
                            
                    </div>

                    <div class="flex w-full border-b-2">
                        <span class="font-bold">Dados complementares</span>
                    </div>

                    <div class="flex flex-col mt-4">
                        <div class="flex flex-row gap-2">
                            <DropDownMenu :required="perfilInvalid" class="w-[243px]" label="Perfil" :selectedValue="perfil" @update:modelValue="perfil = $event">
                                <option v-for="(status, index) in profiles" :key="index">{{ status.label }}</option>
                            </DropDownMenu>
                            <InputField label="Função" class="w-[243px]" :value="funcao" @update:modelValue="funcao = $event" />
                            <InputField label="Naturalidade" class="w-[243px]" :value="naturalidade" @update:modelValue="naturalidade = $event" />
                        </div>
                        <InputField label="Chave PIX" class="w-[387px]" :value="pix_key" @update:modelValue="pix_key = $event" />
                    </div>

                    <div class="flex w-full border-b-2">
                        <span class="font-bold">Horário de trabalho</span>
                    </div>

                    <div class="flex flex-row mt-4 w-full justify-between mb-4">
                        <div class="flex flex-col w-[285px] h-[96px]">
                            <span class="text-sm font-bold mb-[17px]">
                                Dias da semana
                            </span>
                            
                            <div class="flex flex-row w-[285px] justify-between">
                                <TimePicker label="Inicio" :time="dia_util_inicio" @update:modelValue="dia_util_inicio = $event" />
                                <TimePicker label="Fim" :time="dia_util_fim" @update:modelValue="dia_util_fim = $event" />
                            </div>
                            <span v-if="dia_util_fimInvalid || dia_util_inicioInvalid" class="text-[10px] text-red-500">Campo obrigatório</span>
                        </div>

                        <div class="flex flex-col w-[285px] h-[96px]">
                            <span class="text-sm font-bold mb-[17px]">
                                Sábado
                            </span>

                            <div class="flex flex-row w-[285px] justify-between">
                                <TimePicker label="Inicio" :time="sabado_inicio" @update:modelValue="sabado_inicio = $event"/>
                                <TimePicker label="Fim" :time="sabado_fim" @update:modelValue="sabado_fim = $event" />
                            </div>
                            <span v-if="sabado_fimInvalid || sabado_inicioInvalid" class="text-[10px] text-red-500">Campo obrigatório</span>
                        </div>
                    </div>

                    <div class="flex w-full border-b-2">
                        <span class="font-bold">Documentos</span>
                    </div>

                    <div class="flex flex-col mt-4">
                        <div class="flex flex-row justify-between">
                            <InputField label="Número de identidade" class="w-[243px]" :value="numero_identidade" @update:modelValue="numero_identidade = $event" />
                            <InputField label="Órgão emissor" class="w-[243px]" :value="orgao_emissor_identidade" @update:modelValue="orgao_emissor_identidade = $event" />
                            <DropDownMenu :required="uf_identidadeInvalid" class="w-[243px]" label="UF identidade" :selectedValue="uf_identidade" @update:modelValue="uf_identidade = $event">
                                <option v-for="(status, index) in ufStates" :key="index">{{ status.label }}</option>
                            </DropDownMenu>
                        </div>

                        <div class="flex flex-row justify-between">
                            <InputField label="Título de eleitor" class="w-[243px]" :value="numero_titulo_eleitor" @update:modelValue="numero_titulo_eleitor = $event" />
                            <InputField label="Seção do título" class="w-[243px]" :value="secao_titulo_eleitor" @update:modelValue="secao_titulo_eleitor = $event" />
                            <InputField label="Zona do título" class="w-[243px]" :value="zona_titulo_eleitor" @update:modelValue="zona_titulo_eleitor = $event" />
                        </div>

                        <div class="flex flex-row justify-between">
                            <InputField label="Carteira de trabalho" class="w-[190px]" :value="numero_carteira_trabalho" @update:modelValue="numero_carteira_trabalho = $event" />
                            <InputField label="Série da carteira" class="w-[190px]" :value="serie_carteira_trabalho" @update:modelValue="serie_carteira_trabalho = $event" />
                            <InputField :required="data_emissao_carteira_trabalhoInvalid" label="Data da emissão da carteira" class="w-[190px]" :value="data_emissao_carteira_trabalho" @update:modelValue="data_emissao_carteira_trabalho = $event" />
                            <DropDownMenu :required="uf_carteira_trabalhoInvalid" class="w-[155px]" label="UF da carteira" :selectedValue="uf_carteira_trabalho" @update:modelValue="uf_carteira_trabalho = $event">
                                <option v-for="(status, index) in ufStates" :key="index">{{ status.label }}</option>
                            </DropDownMenu>
                        </div>
                    </div>

                    <div class="flex w-full border-b-2">
                        <span class="font-bold">Endereço</span>
                    </div>

                    <div class="flex flex-col mt-4">
                        <div class="flex flex-row items-center">
                            <InputField :required="cepInvalid" label="CEP" class="w-[208px]" :value="cep" @update:modelValue="cep = $event" />
                            <button class="text-blue-500 ml-1">Maps</button>
                        </div>

                        <div class="flex flex-row justify-between">
                            <InputField :required="logradouroInvalid" label="Logradouro" class="w-[555px]" :value="logradouro" @update:modelValue="logradouro = $event" />
                            <InputField :required="numeroInvalid" label="Número" class="w-[182px]" :value="numero" @update:modelValue="numero = $event" />
                        </div>

                        <div class="flex flex-row justify-between mb-4">
                            <DropDownMenu class="w-[102px]" label="Estado" :selectedValue="estado" @update:modelValue="estado = $event">
                                <option v-for="(status, index) in ufStates" :key="index">{{ status.label }}</option>
                            </DropDownMenu>
                            <DropDownMenu :required="cidadeInvalid" class="w-[317px]" label="Cidade" :selectedValue="cidade" @update:modelValue="cidade = $event">
                                <option v-if="citiesLoaded" v-for="(status, index) in cities" :key="index">{{ status.label }}</option>
                            </DropDownMenu>
                            <DropDownMenu :required="bairroInvalid" class="w-[317px]" label="Bairro" :selectedValue="bairro" @update:modelValue="bairro = $event">
                                <option v-if="neighborhoodLoaded" v-for="(status, index) in neighborhoods" :key="index">{{ status.label }}</option>
                            </DropDownMenu>
                        </div>

                        <div class="flex flex-w justify-between">
                            <InputField label="Referência" class="w-[368px]" :value="referencia" update:modelValue="referencia = $event" />
                            <InputField label="Complemento" class="w-[369px]" :value="complemento" @update:modelValue="complemento = $event" />
                        </div>
                    </div>

                    <div class="flex w-full border-b-2">
                        <span class="font-bold">Telefone</span>
                    </div>

                    <div class="flex flex-row justify-between mt-4">
                        <InputField :required="telefoneInvalid" label="Telefone" class="w-[368px]" :value="telefone" @update:modelValue="telefone = $event" />
                        <InputField :required="emailInvalid" label="Email" class="w-[368px]" :value="email" @update:modelValue="email = $event" />
                    </div>

                    <div class="flex flex-row justify-end gap-2">
                        <button class="bg-[#BEBEBE33] text-[#00000080] w-[115px] h-[40px] rounded-lg mt-4 hover:scale-105" @click="closeModal">Cancelar</button>
                        <button class="bg-[#007AD6] text-white w-[115px] h-[40px] rounded-lg mt-4 hover:scale-105 mb-3" @click="postUser">Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, defineEmits, onMounted } from 'vue';
import InputField from '@/components/adduser/InputField.vue';
import DropDownMenu from '@/components/adduser/DropDownMenu.vue';
import TimePicker from '@/components/adduser/TimePicker.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import closeIcon from '@/assets/adduser/close-icon.svg';
import emptyUserPhotoIcon from '@/assets/adduser/empty-user-photo-icon.svg';
import calendarIcon from '@/assets/adduser/calendar-icon.svg';
import { profiles } from '@/enums/profilesEnum.js';
import { civilStatusOptions } from '@/enums/civilStatusEnum.js';
import { ufStates } from '@/enums/ufStatesEnum.js';

import { postUserService, fetchUserService, fetchNeighborhoodsService, fetchCitiesService } from '@/service/apiService.js';

// If there's an userId, modal was opened by clicking in an user
const props = defineProps({
  userId: {
    type: Number,
    required: false
  }
});

const userDataLoaded = ref(true); // Variable to check if the user data was loaded if modal opened by clicking user
const citiesLoaded = ref(false); // Variable to check if the cities were loaded
const neighborhoodLoaded = ref(false); // Variable to check if the neighborhoods were loaded

const cities = ref([]);
const neighborhoods = ref([]);

const nome = ref('');
const cpf_cnpj = ref('');
const nome_pai = ref('');
const nome_mae = ref('');
const estado_civil = ref('');
let data_nascimento = ref('');
const apelido = ref('');

const perfil = ref('');
const funcao = ref('');
const naturalidade = ref('');
const pix_key = ref('');

const dia_util_inicio = ref('');
const dia_util_fim = ref('');
const sabado_inicio = ref('');
const sabado_fim = ref('');

const numero_identidade = ref('');
const orgao_emissor_identidade = ref('');
const uf_identidade = ref('');
const numero_titulo_eleitor = ref('');
const secao_titulo_eleitor = ref('');
const zona_titulo_eleitor = ref('');
const numero_carteira_trabalho = ref('');
const serie_carteira_trabalho = ref('');
const data_emissao_carteira_trabalho = ref('');
const uf_carteira_trabalho = ref('');

const cep = ref('');
const logradouro = ref('');
const numero = ref('');
const estado = ref('');
const cidade = ref('');
const bairro = ref('');
const referencia = ref('');
const complemento = ref('');

const telefone = ref('');
const email = ref('');

// Required fields according to the API
const nomeInvalid = ref(false);
const cpfInvalid = ref(false);
const bairroInvalid = ref(false);
const emailInvalid = ref(false);
const telefoneInvalid = ref(false);
const cidadeInvalid = ref(false);
const numeroInvalid = ref(false);
const logradouroInvalid = ref(false);
const cepInvalid = ref(false);
const data_emissao_carteira_trabalhoInvalid = ref(false);
const uf_identidadeInvalid = ref(false);
const uf_carteira_trabalhoInvalid = ref(false);
const perfilInvalid = ref(false);
const data_nascimentoInvalid = ref(false);
const estado_civilInvalid = ref(false);
const dia_util_inicioInvalid = ref(false);
const dia_util_fimInvalid = ref(false);
const sabado_inicioInvalid = ref(false);
const sabado_fimInvalid = ref(false);

// Define the event of type close-modal to close the modal when clicking the x
const emits = defineEmits(['close-modal']);
const closeModal = () => {
    emits('close-modal');
};

// Function to load the cities from the API
const loadCities = async () => {

    const responseData = await fetchCitiesService()

    if (!responseData) {
          throw new Error(`HTTP error status: ${response.status}`);
    }

    cities.value = responseData.map(item => ({
          value: item.id,
          label: item.nome
    }));
}

// Function to load the neighborhoods based on the selected city
const loadNeighborhoods = async (cityId) => {

    const responseData = await fetchNeighborhoodsService(cityId);

    if (!responseData) {
          throw new Error(`HTTP error status: ${response.status}`);
    }

    neighborhoods.value = responseData.map(item => ({
          value: item.id,
          label: item.nome
    }));
}


const postUser = async () => {
    if(checkInvalidFields()) return;

    const pessoa = mapUserToJson();
    const response = await postUserService(pessoa);

    if (!response) return;
    
    closeModal();

};

const fetchUser = async (userId) => {

    try{
        const responseData = await fetchUserService(userId);
        await loadNeighborhoods(responseData.endereco_residencial.cidade)
        mapJsonToUser(responseData)
        userDataLoaded.value = true
    } catch (error) {
        alert('Erro ao carregar usuário')
        closeModal()
    }
}

// Checking if the modal was open by clicking in a user
if (props.userId) {
    userDataLoaded.value = false;
    fetchUser(props.userId)
}

// Load the available cities when the modal is open
onMounted( async () => {
    await loadCities();
    citiesLoaded.value = true;
});

// Load the available neighborhoods when the city is selected
watch (cidade, async (newValue, oldValue) => {
    const selectedCity = cities.value.find(city => city.label === newValue).value
    await loadNeighborhoods(selectedCity);
    neighborhoodLoaded.value = true;
});

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  data_nascimento = `${day}/${month}/${year}`;
};

function formatPhoneNumber(number) {
  let formattedNumber = '(' + number.substring(0, 2) + ') ';
  
  formattedNumber += number.substring(2, 7) + '-' + number.substring(7);
  
  return formattedNumber;
}

const checkInvalidFields = () => {
    nomeInvalid.value = nome.value === '';
    cpfInvalid.value = cpf_cnpj.value === '';
    data_nascimentoInvalid.value = data_nascimento.value === '';
    perfilInvalid.value = perfil.value === '';
    cepInvalid.value = cep.value === '';
    logradouroInvalid.value = logradouro.value === '';
    numeroInvalid.value = numero.value === '';
    cidadeInvalid.value = cidade.value === '';
    bairroInvalid.value = bairro.value === '';
    telefoneInvalid.value = telefone.value === '';
    emailInvalid.value = email.value === '';
    dia_util_inicioInvalid.value = dia_util_inicio.value === '';
    dia_util_fimInvalid.value = dia_util_fim.value === '';
    sabado_inicioInvalid.value = sabado_inicio.value === '';
    sabado_fimInvalid.value = sabado_fim.value === '';
    data_emissao_carteira_trabalhoInvalid.value = data_emissao_carteira_trabalho.value === '';
    uf_carteira_trabalhoInvalid.value = uf_carteira_trabalho.value === '';
    uf_identidadeInvalid.value = uf_identidade.value === '';
    
    // Return true if any field is invalid
    return nomeInvalid.value || cpfInvalid.value || data_nascimentoInvalid.value || 
            perfilInvalid.value || cepInvalid.value || logradouroInvalid.value || numeroInvalid.value || 
            cidadeInvalid.value || bairroInvalid.value || telefoneInvalid.value || emailInvalid.value ||
            dia_util_inicioInvalid.value || dia_util_fimInvalid.value || sabado_inicioInvalid.value || sabado_fimInvalid.value ||
            data_emissao_carteira_trabalhoInvalid.value || uf_carteira_trabalhoInvalid.value || uf_identidadeInvalid.value;
}

// Function to map the JSON object retrieved from the API to the user data
const mapJsonToUser = (jsonObject) => {
    nome.value = jsonObject.nome;
    nome_pai.value = jsonObject.nome_pai;
    nome_mae.value = jsonObject.nome_mae;
    cpf_cnpj.value = jsonObject.cpf_cnpj;
    estado_civil.value = civilStatusOptions.find(civilState => jsonObject.estado_civil == civilState.value).label;
    data_nascimento.value = jsonObject.data_nascimento;
    apelido.value = jsonObject.apelido;
    perfil.value = profiles.find(profile => jsonObject.perfil == profile.value).label;
    funcao.value = jsonObject.funcao;
    naturalidade.value = jsonObject.naturalidade;
    pix_key.value = jsonObject.pix_key;
    dia_util_inicio.value = jsonObject.horario_colaborador.dia_util_inicio_manha;
    dia_util_fim.value = jsonObject.horario_colaborador.dia_util_fim_manha;
    sabado_inicio.value = jsonObject.horario_colaborador.sabado_inicio;
    sabado_fim.value = jsonObject.horario_colaborador.sabado_fim;
    numero_identidade.value = jsonObject.numero_identidade;
    orgao_emissor_identidade.value = jsonObject.orgao_emissor_identidade;
    uf_identidade.value = ufStates.find(state => jsonObject.uf_identidade == state.value).label;
    numero_titulo_eleitor.value = jsonObject.numero_titulo_eleitor;
    secao_titulo_eleitor.value = jsonObject.secao_titulo_eleitor;
    zona_titulo_eleitor.value = jsonObject.zona_titulo_eleitor;
    numero_carteira_trabalho.value = jsonObject.numero_carteira_trabalho;
    serie_carteira_trabalho.value = jsonObject.serie_carteira_trabalho;
    data_emissao_carteira_trabalho.value = jsonObject.data_emissao_carteira_trabalho;
    uf_carteira_trabalho.value = ufStates.find(state => jsonObject.uf_carteira_trabalho == state.value).label;
    cep.value = jsonObject.endereco_residencial.cep;
    logradouro.value = jsonObject.endereco_residencial.logradouro;
    numero.value = String(jsonObject.endereco_residencial.numero);
    estado.value = jsonObject.endereco_residencial.estado;
    cidade.value = cities.value.find(city => jsonObject.endereco_residencial.cidade == city.value).label;
    bairro.value = neighborhoods.value.find(neighborhood => jsonObject.endereco_residencial.bairro == neighborhood.value).label;
    referencia.value = jsonObject.endereco_residencial.referencia;
    complemento.value = jsonObject.endereco_residencial.complemento;
    telefone.value = jsonObject.algum_telefone;
    email.value = jsonObject.email;
}

// Function to map the user data to a JSON object to send to the API
const mapUserToJson = () => {
    return JSON.stringify({
        nome: nome.value,
        nome_pai: nome_pai.value,
        nome_mae: nome_mae.value,
        cpf_cnpj: cpf_cnpj.value,
        estado_civil: civilStatusOptions.find(status => status.label === estado_civil.value).value,
        data_nascimento: data_nascimento.value,
        apelido: apelido.value,
        perfil: profiles.find(profile => profile.label === perfil.value).value,
        funcao: funcao.value,
        naturalidade: naturalidade.value,
        pix_key: pix_key.value,
        numero_identidade: numero_identidade.value,
        orgao_emissor_identidade: orgao_emissor_identidade.value,
        uf_identidade: ufStates.find(uf => uf.label === uf_identidade.value).value || '',
        numero_titulo_eleitor: numero_titulo_eleitor.value,
        secao_titulo_eleitor: secao_titulo_eleitor.value,
        zona_titulo_eleitor: zona_titulo_eleitor.value,
        numero_carteira_trabalho: numero_carteira_trabalho.value,
        serie_carteira_trabalho: serie_carteira_trabalho.value,
        data_emissao_carteira_trabalho: data_emissao_carteira_trabalho.value,
        uf_carteira_trabalho: ufStates.find(uf => uf.label === uf_carteira_trabalho.value).value || '',
        telefone: formatPhoneNumber(telefone.value),
        email: email.value,
        horario_colaborador: {
            dia_util_inicio_manha: dia_util_inicio.value,
            dia_util_fim_manha: dia_util_fim.value,
            dia_util_inicio_tarde: dia_util_inicio.value,
            dia_util_fim_tarde: dia_util_fim.value,
            sabado_inicio: sabado_inicio.value,
            sabado_fim: sabado_fim.value,
        },
        endereco_residencial: {
            cep: cep.value,
            logradouro: logradouro.value,
            numero: numero.value,
            cidade: cities.value.find(city => city.label === cidade.value).value,
            bairro: neighborhoods.value.find(neighborhood => neighborhood.label === bairro.value).value,
            referencia: referencia.value,
            complemento: complemento.value,
        }
    })
}

</script>