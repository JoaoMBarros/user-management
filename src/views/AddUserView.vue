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
                            <InputField :required="invalidFields.nomeInvalid" label="Nome" :value="userData.nome" @update:modelValue="userData.nome = $event"/>
                            <InputField label="Nome da Mãe" :value="userData.nome_mae" @update:modelValue="userData.nome_mae = $event"/>
                            <InputField label="Nome do Pai" :value="userData.nome_pai" @update:modelValue="userData.nome_pai = $event"/>
                        </div>
                    </div>

                    <div class="flex gap-2 flex-row">
                        <!-- CPF -->
                        <InputField :required="invalidFields.cpf_cnpjInvalid" label="CPF" class="w-[180px]" :value="userData.cpf_cnpj" @update:modelValue="userData.cpf_cnpj = $event"/>

                        <!-- Menu de dropdown pro estado civil -->
                        <DropDownMenu :required="invalidFields.estado_civilInvalid" label="Estado Civil" class="w-[180px]" :selectedValue="userData.estado_civil" @update:modelValue="userData.estado_civil = $event">
                            <option v-for="(status, index) in civilStatusOptions" :key="index">{{ status.label }}</option>
                        </DropDownMenu>
                    
                        <!-- Calendario -->
                        <div class="flex flex-col">
                            <span class="text-sm text-[#00000080]"> Data de nascimento </span>
                            <VueDatePicker model-value="birthdate" locale="pt-BR" class="w-[180px]" @update:model-value="formatDate">
                                <template #trigger>
                                    <button class="flex gap-6 items-center w-full border h-[38px] rounded-lg"><calendarIcon class="ml-1" />{{ userData.data_nascimento }}</button>
                                    <span v-if="invalidFields.data_nascimentoInvalid" class="text-[10px] text-red-500">Campo obrigatório</span>
                                </template>
                            </VueDatePicker>
                        </div>

                        <!-- Apelido-->
                        <InputField label="Apelido" class="w-[180px]" :value="userData.apelido" @update:modelValue="apelido = $event"/>
                            
                    </div>

                    <div class="flex w-full border-b-2">
                        <span class="font-bold">Dados complementares</span>
                    </div>

                    <div class="flex flex-col mt-4">
                        <div class="flex flex-row gap-2">
                            <DropDownMenu :required="invalidFields.perfilInvalid" class="w-[243px]" label="Perfil" :selectedValue="userData.perfil" @update:modelValue="userData.perfil = $event">
                                <option v-for="(status, index) in profiles" :key="index">{{ status.label }}</option>
                            </DropDownMenu>
                            <InputField label="Função" class="w-[243px]" :value="userData.funcao" @update:modelValue="userData.funcao = $event" />
                            <InputField label="Naturalidade" class="w-[243px]" :value="userData.naturalidade" @update:modelValue="userData.naturalidade = $event" />
                        </div>
                        <InputField label="Chave PIX" class="w-[387px]" :value="userData.pix_key" @update:modelValue="userData.pix_key = $event" />
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
                                <TimePicker label="Inicio" :time="workHours.dia_util_inicio" @update:modelValue="workHours.dia_util_inicio = $event" />
                                <TimePicker label="Fim" :time="workHours.dia_util_fim" @update:modelValue="workHours.dia_util_fim = $event" />
                            </div>
                            <span v-if="invalidFields.dia_util_fimInvalid || invalidFields.dia_util_inicioInvalid" class="text-[10px] text-red-500">Campo obrigatório</span>
                        </div>

                        <div class="flex flex-col w-[285px] h-[96px]">
                            <span class="text-sm font-bold mb-[17px]">
                                Sábado
                            </span>

                            <div class="flex flex-row w-[285px] justify-between">
                                <TimePicker label="Inicio" :time="workHours.sabado_inicio" @update:modelValue="workHours.sabado_inicio = $event"/>
                                <TimePicker label="Fim" :time="workHours.sabado_fim" @update:modelValue="workHours.sabado_fim = $event" />
                            </div>
                            <span v-if="invalidFields.sabado_fimInvalid || invalidFields.sabado_inicioInvalid" class="text-[10px] text-red-500">Campo obrigatório</span>
                        </div>
                    </div>

                    <div class="flex w-full border-b-2">
                        <span class="font-bold">Documentos</span>
                    </div>

                    <div class="flex flex-col mt-4">
                        <div class="flex flex-row justify-between">
                            <InputField label="Número de identidade" class="w-[243px]" :value="userData.numero_identidade" @update:modelValue="userData.numero_identidade = $event" />
                            <InputField label="Órgão emissor" class="w-[243px]" :value="userData.orgao_emissor_identidade" @update:modelValue="userData.orgao_emissor_identidade = $event" />
                            <DropDownMenu :required="invalidFields.uf_identidadeInvalid" class="w-[243px]" label="UF identidade" :selectedValue="userData.uf_identidade" @update:modelValue="userData.uf_identidade = $event">
                                <option v-for="(status, index) in ufStates" :key="index">{{ status.label }}</option>
                            </DropDownMenu>
                        </div>

                        <div class="flex flex-row justify-between">
                            <InputField label="Título de eleitor" class="w-[243px]" :value="userData.numero_titulo_eleitor" @update:modelValue="userData.numero_titulo_eleitor = $event" />
                            <InputField label="Seção do título" class="w-[243px]" :value="userData.secao_titulo_eleitor" @update:modelValue="userData.secao_titulo_eleitor = $event" />
                            <InputField label="Zona do título" class="w-[243px]" :value="userData.zona_titulo_eleitor" @update:modelValue="userData.zona_titulo_eleitor = $event" />
                        </div>

                        <div class="flex flex-row justify-between">
                            <InputField label="Carteira de trabalho" class="w-[190px]" :value="userData.numero_carteira_trabalho" @update:modelValue="userData.numero_carteira_trabalho = $event" />
                            <InputField label="Série da carteira" class="w-[190px]" :value="userData.serie_carteira_trabalho" @update:modelValue="userData.serie_carteira_trabalho = $event" />
                            <InputField :required="invalidFields.data_emissao_carteira_trabalhoInvalid" label="Data da emissão da carteira" class="w-[190px]" :value="userData.data_emissao_carteira_trabalho" @update:modelValue="userData.data_emissao_carteira_trabalho = $event" />
                            <DropDownMenu :required="invalidFields.uf_carteira_trabalhoInvalid" class="w-[155px]" label="UF da carteira" :selectedValue="userData.uf_carteira_trabalho" @update:modelValue="userData.uf_carteira_trabalho = $event">
                                <option v-for="(status, index) in ufStates" :key="index">{{ status.label }}</option>
                            </DropDownMenu>
                        </div>
                    </div>

                    <div class="flex w-full border-b-2">
                        <span class="font-bold">Endereço</span>
                    </div>

                    <div class="flex flex-col mt-4">
                        <div class="flex flex-row items-center">
                            <InputField :required="invalidFields.cepInvalid" label="CEP" class="w-[208px]" :value="addressData.cep" @update:modelValue="addressData.cep = $event" />
                            <button class="text-blue-500 ml-1">Maps</button>
                        </div>

                        <div class="flex flex-row justify-between">
                            <InputField :required="invalidFields.logradouroInvalid" label="Logradouro" class="w-[555px]" :value="addressData.logradouro" @update:modelValue="addressData.logradouro = $event" />
                            <InputField :required="invalidFields.numeroInvalid" label="Número" class="w-[182px]" :value="addressData.numero" @update:modelValue="addressData.numero = $event" />
                        </div>

                        <div class="flex flex-row justify-between mb-4">
                            <DropDownMenu class="w-[102px]" label="Estado" :selectedValue="addressData.estado" @update:modelValue="addressData.estado = $event">
                                <option v-for="(status, index) in ufStates" :key="index">{{ status.label }}</option>
                            </DropDownMenu>
                            <DropDownMenu :required="invalidFields.cidadeInvalid" class="w-[317px]" label="Cidade" :selectedValue="addressData.cidade" @update:modelValue="addressData.cidade = $event">
                                <option v-if="citiesLoaded" v-for="(status, index) in cities" :key="index">{{ status.label }}</option>
                            </DropDownMenu>
                            <DropDownMenu :required="invalidFields.bairroInvalid" class="w-[317px]" label="Bairro" :selectedValue="addressData.bairro" @update:modelValue="addressData.bairro = $event">
                                <option v-if="neighborhoodLoaded" v-for="(status, index) in neighborhoods" :key="index">{{ status.label }}</option>
                            </DropDownMenu>
                        </div>

                        <div class="flex flex-w justify-between">
                            <InputField label="Referência" class="w-[368px]" :value="addressData.referencia" @update:modelValue="addressData.referencia = $event" />
                            <InputField label="Complemento" class="w-[369px]" :value="addressData.complemento" @update:modelValue="addressData.complemento = $event" />
                        </div>
                    </div>

                    <div class="flex w-full border-b-2">
                        <span class="font-bold">Telefone</span>
                    </div>

                    <div class="flex flex-row justify-between mt-4">
                        <InputField :required="invalidFields.telefoneInvalid" label="Telefone" class="w-[368px]" :value="userData.telefone" @update:modelValue="userData.telefone = $event" />
                        <InputField :required="invalidFields.emailInvalid" label="Email" class="w-[368px]" :value="userData.email" @update:modelValue="userData.email = $event" />
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
import { ref, watch, defineEmits, onMounted, reactive } from 'vue';
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

const userData = reactive({
    nome : '',
    cpf_cnpj : '',
    nome_pai : '',
    nome_mae : '',
    estado_civil : '',
    data_nascimento : '',
    apelido : '',
    perfil : '',
    funcao : '',
    naturalidade : '',
    pix_key : '',
    numero_identidade : '',
    orgao_emissor_identidade : '',
    uf_identidade : '',
    numero_titulo_eleitor : '',
    secao_titulo_eleitor : '',
    zona_titulo_eleitor : '',
    numero_carteira_trabalho : '',
    serie_carteira_trabalho : '',
    data_emissao_carteira_trabalho : '',
    uf_carteira_trabalho : '',
    telefone : '',
    email : '',
})

const addressData = reactive({
    cep: '',
    logradouro: '',
    numero: '',
    estado: '',
    cidade: '',
    bairro: '',
    referencia: '',
    complemento: '',
});

const workHours = reactive({
    dia_util_inicio: '',
    dia_util_fim: '',
    sabado_inicio: '',
    sabado_fim: '',
});

// Required fields according to the API
const invalidFields = reactive({
    nomeInvalid: false,
    cpf_cnpjInvalid: false,
    data_nascimentoInvalid: false,
    perfilInvalid: false,
    cepInvalid: false,
    logradouroInvalid: false,
    numeroInvalid: false,
    cidadeInvalid: false,
    bairroInvalid: false,
    telefoneInvalid: false,
    emailInvalid: false,
    dia_util_inicioInvalid: false,
    dia_util_fimInvalid: false,
    sabado_inicioInvalid: false,
    sabado_fimInvalid: false,
    data_emissao_carteira_trabalhoInvalid: false,
    uf_carteira_trabalhoInvalid: false,
    uf_identidadeInvalid: false,
    estado_civilInvalid: false,
});

// Define the event of type close-modal to close the modal when clicking the x
const emits = defineEmits(['close-modal']);
const closeModal = () => {
    emits('close-modal');
};

// Function to load the cities from the API
const loadCities = async () => {
    const responseData = await fetchCitiesService();

    if (!responseData) throw new Error(`HTTP error status: ${response.status}`);
    
    cities.value = responseData.map(item => ({
          value: item.id,
          label: item.nome
    }));
}

// Function to load the neighborhoods based on the selected city
const loadNeighborhoods = async (cityId) => {
    const responseData = await fetchNeighborhoodsService(cityId);

    if (!responseData) throw new Error(`HTTP error status: ${response.status}`);
    
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
watch (() => addressData.cidade, async (newValue, oldValue) => {
    if (newValue !== oldValue) {
        const selectedCity = cities.value.find(city => city.label === newValue).value
        await loadNeighborhoods(selectedCity);
        neighborhoodLoaded.value = true;
    }
});

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  userData.data_nascimento = `${day}/${month}/${year}`;
};

function formatPhoneNumber(number) {
  let formattedNumber = '(' + number.substring(0, 2) + ') ';
  
  formattedNumber += number.substring(2, 7) + '-' + number.substring(7);
  
  return formattedNumber;
}

const checkInvalidFields = () => {
    const fields = [
        { name: 'nome', value: userData.nome },
        { name: 'cpf_cnpj', value: userData.cpf_cnpj },
        { name: 'data_nascimento', value: userData.data_nascimento },
        { name: 'perfil', value: userData.perfil },
        { name: 'cep', value: addressData.cep },
        { name: 'logradouro', value: addressData.logradouro },
        { name: 'numero', value: addressData.numero },
        { name: 'cidade', value: addressData.cidade },
        { name: 'bairro', value: addressData.bairro },
        { name: 'telefone', value: userData.telefone },
        { name: 'email', value: userData.email },
        { name: 'dia_util_inicio', value: workHours.dia_util_inicio },
        { name: 'dia_util_fim', value: workHours.dia_util_fim },
        { name: 'sabado_inicio', value: workHours.sabado_inicio },
        { name: 'sabado_fim', value: workHours.sabado_fim },
        { name: 'data_emissao_carteira_trabalho', value: userData.data_emissao_carteira_trabalho },
        { name: 'uf_carteira_trabalho', value: userData.uf_carteira_trabalho },
        { name: 'uf_identidade', value: userData.uf_identidade },
        { name: 'estado_civil', value: userData.estado_civil }
    ];

    let hasInvalidField = false;

    fields.forEach(field => {
        const invalid = field.name + 'Invalid'; // Creating the name of the variable to check if the field is invalid
        invalidFields[invalid] = field.value === ''; // Setting the value of the variable to true if the field is empty
        if (invalidFields[invalid]) {
            hasInvalidField = true;
        }
    });

    return hasInvalidField;
}

// Function to map the JSON object retrieved from the API to the user data
const mapJsonToUser = (jsonObject) => {
    const {
        nome, nome_pai, nome_mae, cpf_cnpj, estado_civil, data_nascimento, apelido,
        perfil, funcao, naturalidade, pix_key,
        horario_colaborador: { dia_util_inicio_manha, dia_util_fim_tarde, sabado_inicio, sabado_fim },
        numero_identidade, orgao_emissor_identidade, uf_identidade,
        numero_titulo_eleitor, secao_titulo_eleitor, zona_titulo_eleitor,
        numero_carteira_trabalho, serie_carteira_trabalho, data_emissao_carteira_trabalho, uf_carteira_trabalho,
        endereco_residencial: { cep, logradouro, numero, cidade, bairro, referencia, complemento },
        algum_telefone,
        email
    } = jsonObject;

    userData.nome = nome;
    userData.nome_pai = nome_pai;
    userData.nome_mae = nome_mae;
    userData.cpf_cnpj = cpf_cnpj;
    userData.estado_civil = civilStatusOptions.find(civilState => estado_civil == civilState.value).label;
    userData.data_nascimento = data_nascimento;
    userData.apelido = apelido;
    userData.perfil = profiles.find(profile => perfil == profile.value).label;
    userData.funcao = funcao;
    userData.naturalidade = naturalidade;
    userData.pix_key = pix_key;
    userData.numero_identidade = numero_identidade;
    userData.orgao_emissor_identidade = orgao_emissor_identidade;
    userData.uf_identidade = ufStates.find(state => uf_identidade == state.value).label;
    userData.numero_titulo_eleitor = numero_titulo_eleitor;
    userData.secao_titulo_eleitor = secao_titulo_eleitor;
    userData.zona_titulo_eleitor = zona_titulo_eleitor;
    userData.numero_carteira_trabalho = numero_carteira_trabalho;
    userData.serie_carteira_trabalho = serie_carteira_trabalho;
    userData.data_emissao_carteira_trabalho = data_emissao_carteira_trabalho;
    userData.uf_carteira_trabalho = ufStates.find(state => uf_carteira_trabalho == state.value).label;
    userData.telefone = algum_telefone;
    userData.email = email;
    
    workHours.dia_util_inicio = dia_util_inicio_manha;
    workHours.dia_util_fim = dia_util_fim_tarde;
    workHours.sabado_inicio = sabado_inicio;
    workHours.sabado_fim = sabado_fim;

    addressData.cep = cep;
    addressData.logradouro = logradouro;
    addressData.numero = String(numero);
    addressData.cidade = cities.value.find(city => cidade == city.value).label;
    addressData.bairro = neighborhoods.value.find(neighborhood => bairro == neighborhood.value).label;
    addressData.referencia = referencia;
    addressData.complemento = complemento;

}

// Function to map the user data to a JSON object to send to the API
const mapUserToJson = () => {

    // Function to convert the value of the options to the expected integer value
    function convertValue(value) {
        return Number(value.value);
    }

    // Function to find the option in the array and convert the value
    function findAndConvert(label, optionsArray) {
        const option = optionsArray.find(option => option.label === label);
        return convertValue(option);
    }

    const { estado, ...restOfAddress } = addressData; // The API doesn't expect the estado field in the address object
    const enderecoResidencial = { 
            ...restOfAddress,
            cidade: findAndConvert(addressData.cidade, cities.value),
            bairro: findAndConvert(addressData.bairro, neighborhoods.value),
    }

    // Extracting the string values of the fields to convert to the expected integer values
    const { telefone, estado_civil, perfil, uf_identidade, uf_carteira_trabalho, ...userDataWithoutFields } = userData;
    const dadosUsuario = { 
            ...userDataWithoutFields,
            telefone: formatPhoneNumber(userData.telefone),
            estado_civil: findAndConvert(userData.estado_civil, civilStatusOptions), //All these values are required
            perfil:  findAndConvert(userData.perfil, profiles),
            uf_identidade: findAndConvert(userData.uf_identidade, ufStates),
            uf_carteira_trabalho: findAndConvert(userData.uf_carteira_trabalho, ufStates),
    }

    const { dia_util_inicio, dia_util_fim, sabado_inicio, sabado_fim } = workHours;

    // Front page doesn't have afternoon start and end, so I used the same value
    const horarioColaborador = {
        dia_util_inicio_manha: dia_util_inicio,
        dia_util_fim_manha: dia_util_fim,
        dia_util_inicio_tarde: dia_util_inicio,
        dia_util_fim_tarde: dia_util_fim,
        sabado_inicio: sabado_inicio,
        sabado_fim: sabado_fim
    }

    return JSON.stringify({
        ...dadosUsuario,
        horario_colaborador: {
            ...horarioColaborador
        },
        endereco_residencial: {
            ...enderecoResidencial
        }
    })
}
</script>