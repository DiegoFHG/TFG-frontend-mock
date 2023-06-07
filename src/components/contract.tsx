import { dedicationOptions, titulationOptions } from "@/app/persons/[id]/page";
import TextLabel from "./text-label";
import SectionContent from "./section-content";

export type StayContract = {
  proccedenceEntity: string;
  department: string;
  responsablePerson: string;
  startDate: Date;
  endDate: Date;
};

type AnualRetribution = {
  amount: number;
  currency: string;
  concept: string;
};

export type LaboralContract = {
  entity: string;
  modality: string;
  professionalGroup: string;
  category: string;
  dedication: string;
  location: string;
  schedule: keyof typeof schedules;
  hours: number;
  startDate: string;
  endDate: string;
  trialPeriod: Date | string[] | { start: string; end: string };
  collectiveAgreement: keyof typeof agreements;
  anualRetribution: AnualRetribution;
  undefinedEndDate: boolean;
};

export type CommercialContractFreelance = {
  entity: string;
  location: string;
  department: string;
  printDate: string;
  modality: number;
  startDate: string;
  endDate: string;
  hours: number;
  subjects: string[];
  amount: number;
};

export type CommercialContractCommercialSocietyData = {
  societyName: string;
  societyCif: string;
  societyRegisteredOffice: string;
  societyIncorporationDate: string;
  societyConstitutionNotary: string;
  societyProtocolNumber: string;
  societyCommercialRegistry: string;
};

type CommercialContractCompany = CommercialContractFreelance &
  CommercialContractCommercialSocietyData;

export type CommercialContract =
  | CommercialContractCompany
  | CommercialContractFreelance;

export type AdHonoremContract = {
  degree: string;
  governingCouncilDate: Date;
  validityDate: Date;
  agreementPrintDate: Date;
  appointmentAcceptanceDate: Date;
};

export type InternshipContract = {
  level: keyof typeof levels;
  titulation: keyof typeof titulationOptions;
  startDate: Date;
  endDate: Date;
  internshipAmount: number;
  feeExemption: number;
  residencyInternship: boolean;
};

export type Contract = {
  id: string;
  contractType: number;
  person: string;
  contract:
    | StayContract
    | AdHonoremContract
    | InternshipContract
    | CommercialContract
    | LaboralContract;
};

export const commercialContractModalities = {
  0: 'Autónomo',
  1: 'Empresa'
}

export const schedules = {
  0: "Tiempo completo",
  1: "Tiempo parcial",
};

export const agreements = {
  //UNEATLANTICO O CITICAN
  0: "XII Convenio de ámbito estatal para los centros de educación universitaria e investigación",
  // MLS (3)
  3: "Convenio colectivo nacional del ciclo del comercio del papel y artes gráficas",
  // PROBEIRO
  2: "Convenio colectivo para el sector de la hostelería de la comunidad autónoma de Cantabria",
  1: "IV Convenio colectivo estatal de instalaciones deportivas y gimnasios",
};

export const levels = {
  0: "Grado",
  1: "Máster",
  2: "Doctorado",
};

export const entities = {
  0: "Uneatlántico",
  1: "Citican",
  2: "Promociones Proibero",
  3: "MLS Journals",
  4: "Otros",
};

export const modalities = {
  0: "Indefinido",
  1: "Temporal",
};

export const categories = [
  {
    0: "Ordinario o Catedrático",
    1: "Agregado o Titular",
    2: "Adjunto",
    3: "Contratado Doctor",
    4: "Colaborador licenciado",
    5: "Ayudante Doctor",
    6: "Auxiliar/Ayudante",
    7: "Asociado",
    8: "Investigador",
    9: "Colaborador de Investigación",
    10: "Ayudante de Investigación",
    11: "Profesor Emérito",
    12: "Profesor Visitante e Invitado",
    13: "Titulado de Grado Superior",
    14: "Titulado de Grado Medio",
    15: "Jefe Superior",
    16: "Jefe de Sección",
    17: "Jefe de Negociado",
    18: "Subjefe de Negociado",
    19: "Oficial de primera",
    20: "Oficial de segunda",
  },
  {
    0: "Director/Directora General",
    1: "Director/Directora de División",
    2: "Director/Directora de Departamento",
    3: "Titulado/Titulada de Grado Superior",
    4: "Jefe/Jefa de Compras",
    5: "Jefe/Jefa de Personal",
    6: "Jefe/Jefa de Informática",
    7: "Jefe/Jefa Financiero",
    8: "Titulado/Titulada de Grado Medio",
    9: "Responsable de Sección",
    10: "Contable",
    11: "Oficial Administrativo/Oficiala Administrativa",
    12: "Programador/Programadora",
    13: "Administrativo/Administrativa-Atención al cliente",
    14: "Técnico/Técnica Mantenimiento Informático",
    15: "Técnico/Técnica Sistemas de Información",
    16: "Auxiliar Administrativo/Administrativa",
    17: "Telefonista",
    18: "Jefe/Jefa de ventas",
    19: "Encargado/Encargada General",
    20: "Gerente de Establecimiento",
    21: "Jefe/Jefa de Grupo",
    22: "Encargado/Encargada de Establecimiento",
    23: "Jefe/Jefa de Sucursal",
    24: "Jefe/Jefa de sección mercantil",
    25: "Dependiente/Dependienta",
    26: "Técnico/Técnica de Comercio Exterior",
    27: "Representante Comercial",
    28: "Administrativo/Administrativa Atención al cliente",
    29: "Oficial Administrativo/Oficiala Administrativa",
    30: "Teleoperador/Teleoperadora",
    31: "Auxiliar de Caja",
    32: "Auxiliar Administrativo/Administrativa",
    33: "Asistente Establecimiento",
    34: "Jefe/Jefa de Sección Logística",
    35: "Jefe/Jefa de Almacén",
    36: "Jefe/Jefa de Transporte",
    37: "Encargado/Encargada de Unidad Logística",
    38: "Profesionaal de Oficio 1.a",
    39: "Repartidor Conductor/Repartidora Conductora",
    40: "Profesional de Oficio 2.a",
    41: "Operario Logística/Operaria Logística",
    42: "Auxiliar Administrativo/Auxiliar Administrativa",
    43: "Mozo Empaquetador/Moza Empaquetadora",
    44: "Personal de Servicios Auxiliares",
    45: "Personal de limpieza por horas* (este cálculo está hecho en base de una hora diaria con derecho a 15 pagas y un mes de vacaciones)",
    46: "Dieta media jornada",
    47: "Dieta jornada completa",
  },
  {
    0: "Jefe Recepción",
    1: "Jede Administración",
    2: "Jefe Comercial",
    3: "Jefe Catering",
    4: "Jefe Cocina",
    5: "Jefe Restaurante/Sala",
    6: "Jefe Recepción 2",
    7: "Primer Conserje",
    8: "2° Jefe Cocina",
    9: "Jefe Operaciones Cater",
    10: "2° Jefe Restaurante/Sala",
    11: "Recepcionista",
    12: "Administrativo",
    13: "Relaciones públicas",
    14: "Comercial",
    15: "Jefe Partida",
    16: "Repostero",
    17: "Encargado Economato",
    18: "Jefe Sector",
    19: "Jefe Sala Catering",
    20: "Encargado General",
    21: "Encargado Sección",
    22: "Encargado Mant/Servic",
    23: "Conserje",
    24: "Cocinero",
    25: "Jefe Equipo/Superv Catering",
    26: "Ayudante Administrativo",
    27: "Telefonista",
    28: "Conductor Catering",
    29: "Especialista Mant/Servicio",
    30: "Camarero",
    31: "Barman/Sumiller",
    32: "Ayte. Recepción/Conserje",
    33: "Ayud/Auxiliar Cocina",
    34: "Ayud/Auxiliar Catering",
    35: "Ayudante Camarero",
    36: "Camarero Pisos",
    37: "Aux. Recepción/Conserj.",
    38: "Aux Pisos/Limpieza",
    39: "Aux Manten/Servicios",
  },
  { 0: "Grupo 1", 1: "Grupo 2", 2: "Grupo 3", 3: "Grupo 4", 4: "Grupo 5" },
];

export const locations = {
  0: "Santander",
  1: "Barcelona",
  2: "Otros",
};

export function Contract({ data }: { data: Contract }) {
  if (data.contractType === 0) {
    const contract = data.contract as LaboralContract;

    return (
      <div className="mb-3">
        <h3 className="text-lg mb-3">Contrato laboral</h3>
        <SectionContent>
          <TextLabel label="Entidad contratante" text={contract.entity} />
          <TextLabel label="Modalidad de contrato" text={contract.modality} />
          <TextLabel label="Jornada" text={schedules[contract.schedule]} />
          <TextLabel label="Dedicación" text={contract.dedication} />
          <TextLabel
            label="Convenio de aplicación"
            text={agreements[contract.collectiveAgreement]}
          />
          <TextLabel label="Categoría" text={contract.category} />
          <TextLabel
            label="Grupo profesional"
            text={contract.professionalGroup}
          />
          <TextLabel label="Centro de trabajo" text={contract.location} />
          <TextLabel
            label="Fecha de inicio"
            text={new Date(contract.startDate).toLocaleDateString()}
          />
          <TextLabel
            label="Fecha de finalización"
            text={new Date(contract.endDate).toLocaleDateString()}
          />
          <TextLabel
            label="Periodo de prueba"
            text={Array.isArray(contract.trialPeriod) ? contract.trialPeriod
              .map((date: string) => new Date(date).toLocaleDateString())
              .join(", ") : ''}
          />
          <TextLabel
            label="Retribución"
            text={`${contract.anualRetribution.amount} ${contract.anualRetribution.currency}`}
          />
        </SectionContent>
        <hr />
      </div>
    );
  }

  if (data.contractType === 1) {
    const contract = data.contract as CommercialContract;

    if (contract.modality === 0) {
      const freelanceContract = contract as CommercialContractFreelance;

      return (
        <div className="mb-3">
          <h3 className="text-lg mb-3">Contrato mercantil autónomo</h3>
          <SectionContent>
            <TextLabel
              label="Entidad contratante"
              text={freelanceContract.entity}
            />
            <TextLabel
              label="Centro de trabajo"
              text={freelanceContract.location}
            />
            <TextLabel
              label="Departamento"
              text={freelanceContract.department}
            />
            <TextLabel
              label="Fecha impresión"
              text={new Date(freelanceContract.printDate).toLocaleDateString()}
            />
            <TextLabel
              label="Fecha inicio"
              text={new Date(freelanceContract.startDate).toLocaleDateString()}
            />
            <TextLabel
              label="Fecha fin"
              text={new Date(freelanceContract.endDate).toLocaleDateString()}
            />
            <TextLabel
              label="Numero de horas de la actividad"
              text={freelanceContract.hours.toString()}
            />
            <TextLabel
              label="Materias a impartir"
              text={freelanceContract.subjects.join(", ")}
            />
            <TextLabel
              label="Importe de la actividad"
              text={freelanceContract.amount.toString()}
            />
          </SectionContent>
          <hr />
        </div>
      );
    }

    if (contract.modality === 1) {
      const companyContract = contract as CommercialContractCompany;

      return (
        <div className="mb-3">
          <h3 className="text-lg mb-3">Contrato comercial empresa</h3>
          <SectionContent>
            <TextLabel
              label="Entidad contratante"
              text={companyContract.entity}
            />
            <TextLabel
              label="Centro de trabajo"
              text={companyContract.location}
            />
            <TextLabel label="Departamento" text={companyContract.department} />
            <TextLabel
              label="Fecha impresión"
              text={new Date(companyContract.printDate).toLocaleDateString()}
            />
            <TextLabel
              label="Fecha inicio"
              text={new Date(companyContract.startDate).toLocaleDateString()}
            />
            <TextLabel
              label="Fecha fin"
              text={new Date(companyContract.endDate).toLocaleDateString()}
            />
            <TextLabel
              label="Numero de horas de la actividad"
              text={companyContract.hours.toString()}
            />
            <TextLabel
              label="Materias a impartir"
              text={companyContract.subjects.join(", ")}
            />
            <TextLabel
              label="Importe de la actividad"
              text={companyContract.amount.toString()}
            />
            <TextLabel
              label="Nombre sociedad"
              text={companyContract.societyName}
            />
            <TextLabel label="CIF" text={companyContract.societyCif} />
            <TextLabel
              label="Domicilio social"
              text={companyContract.societyRegisteredOffice}
            />
            <TextLabel
              label="Fecha constitución sociedad"
              text={companyContract.societyIncorporationDate}
            />
            <TextLabel
              label="Notario constitución"
              text={companyContract.societyConstitutionNotary}
            />
            <TextLabel
              label="Nº protocolo"
              text={companyContract.societyProtocolNumber}
            />
            <TextLabel
              label="Inscripción registro mercantil"
              text={companyContract.societyCommercialRegistry}
            />
          </SectionContent>
          <hr />
        </div>
      );
    }
  }

  if (data.contractType === 2) {
    const contract = data.contract as AdHonoremContract;

    return (
      <div className="mb-3">
        <h3 className="text-lg mb-3">Nombramiento Ad Honorem</h3>
        <SectionContent>
          <TextLabel
            label="Fecha junta de consejo de gobierno"
            text={new Date(contract.governingCouncilDate).toLocaleDateString()}
          />
          <TextLabel label="Titulación" text={contract.degree} />
          <TextLabel
            label="Vigencia nombramiento"
            text={new Date(contract.validityDate).toLocaleDateString()}
          />
          <TextLabel
            label="Fecha aceptación nombramiento"
            text={new Date(
              contract.appointmentAcceptanceDate
            ).toLocaleDateString()}
          />
        </SectionContent>
        <hr />
      </div>
    );
  }

  if (data.contractType === 3) {
    const contract = data.contract as InternshipContract;

    return (
      <div className="mb-3">
        <h3 className="text-lg mb-3">Beca colaboración</h3>
        <SectionContent>
          <TextLabel label="Nivel" text={levels[contract.level]} />
          <TextLabel
            label="Titulación"
            text={titulationOptions[contract.titulation]}
          />
          <TextLabel
            label="Fecha inicio"
            text={new Date(contract.startDate).toLocaleDateString()}
          />
          <TextLabel
            label="Fecha fin"
            text={new Date(contract.endDate).toLocaleDateString()}
          />
          <TextLabel
            label="Importe beca"
            text={contract.internshipAmount.toLocaleString()}
          />
          <TextLabel
            label="% extension beca"
            text={`${contract.feeExemption}%`}
          />
          <TextLabel
            label="Beca residencia"
            text={contract.residencyInternship ? "Si" : "No"}
          />
        </SectionContent>
        <hr />
      </div>
    );
  }

  if (data.contractType === 4) {
    const contract = data.contract as InternshipContract;

    return (
      <div className="mb-3">
        <h3 className="text-lg mb-3">Beca doctorado</h3>
        <SectionContent>
          <TextLabel label="Nivel" text={levels[contract.level]} />
          <TextLabel
            label="Titulación"
            text={titulationOptions[contract.titulation]}
          />
          <TextLabel
            label="Fecha inicio"
            text={new Date(contract.startDate).toLocaleDateString()}
          />
          <TextLabel
            label="Fecha fin"
            text={new Date(contract.endDate).toLocaleDateString()}
          />
          <TextLabel
            label="Importe beca"
            text={contract.internshipAmount.toLocaleString()}
          />
          <TextLabel
            label="% extension beca"
            text={`${contract.feeExemption}%`}
          />
          <TextLabel
            label="Beca residencia"
            text={contract.residencyInternship ? "Si" : "No"}
          />
        </SectionContent>
        <hr />
      </div>
    );
  }

  if (data.contractType === 5) {
    const contract = data.contract as StayContract;

    return (
      <div className="mb-3">
        <h3 className="text-lg mb-3">Estancia de profesorado</h3>
        <SectionContent>
          <TextLabel
            label="Entidad de procedencia"
            text={contract.proccedenceEntity}
          />
          <TextLabel label="Departamento" text={contract.department} />
          <TextLabel
            label="Responsable en el centro de acogida"
            text={contract.responsablePerson}
          />
          <TextLabel
            label="Fecha inicio"
            text={new Date(contract.startDate).toLocaleDateString()}
          />
          <TextLabel
            label="Fecha fin"
            text={new Date(contract.endDate).toLocaleDateString()}
          />
        </SectionContent>
        <hr />
      </div>
    );
  }

  if (data.contractType === 6) {
    const contract = data.contract as StayContract;

    return (
      <div className="mb-3">
        <h3 className="text-lg mb-3">Estancia investigación</h3>
        <SectionContent>
          <TextLabel
            label="Entidad de procedencia"
            text={contract.proccedenceEntity}
          />
          <TextLabel label="Departamento" text={contract.department} />
          <TextLabel
            label="Responsable en el centro de acogida"
            text={contract.responsablePerson}
          />
          <TextLabel
            label="Fecha inicio"
            text={new Date(contract.startDate).toLocaleDateString()}
          />
          <TextLabel
            label="Fecha fin"
            text={new Date(contract.endDate).toLocaleDateString()}
          />
        </SectionContent>
        <hr />
      </div>
    );
  }

  return <div>Tipo de contrato invalido</div>;
}
