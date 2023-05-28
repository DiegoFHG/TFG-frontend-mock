import { dedicationOptions, titulationOptions } from "@/app/persons/[id]/page";
import TextLabel from "./text-label";
import SectionContent from "./section-content";

type StayContract = {
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

type LaboralContract = {
  entity: string;
  modality: string;
  professionalGroup: string;
  category: string;
  dedication: string;
  location: string;
  schedule: keyof typeof schedules;
  hours: number;
  startDate: Date;
  endDate: Date;
  trialPeriod: string[];
  collectiveAgreement: keyof typeof agreements;
  anualRetribution: AnualRetribution;
  undefinedEndDate: boolean;
};

type CommercialContractFreelance = {
  entity: string;
  location: string;
  department: string;
  printDate: Date;
  modality: number;
  startDate: Date;
  endDate: Date;
  hours: number;
  subjects: string[];
  amount: number;
};

type CommercialContractCommercialSocietyData = {
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

type CommercialContract =
  | CommercialContractCompany
  | CommercialContractFreelance;

type AdHonoremContract = {
  degree: string;
  governingCouncilDate: Date;
  validityDate: Date;
  agreementPrintDate: Date;
  appointmentAcceptanceDate: Date;
};

type InternshipContract = {
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

const schedules = {
  0: "Tiempo completo",
  1: "Tiempo parcial",
};

const agreements = {
  //UNEATLANTICO O CITICAN
  0: "XII Convenio de ámbito estatal para los centros de educación universitaria e investigación",
  // MLS (3)
  3: "Convenio colectivo nacional del ciclo del comercio del papel y artes gráficas",
  // PROBEIRO
  2: "Convenio colectivo para el sector de la hostelería de la comunidad autónoma de Cantabria",
  1: "IV Convenio colectivo estatal de instalaciones deportivas y gimnasios",
};

const levels = {
  0: "Grado",
  1: "Máster",
  2: "Doctorado",
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
            text={contract.trialPeriod
              .map((date) => new Date(date).toLocaleDateString())
              .join(", ")}
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
            text={contract.residencyInternship ? 'Si' : 'No'}
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
            text={contract.residencyInternship ? 'Si' : 'No'}
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
          <TextLabel label="Entidad de procedencia" text={contract.proccedenceEntity} />
          <TextLabel label="Departamento" text={contract.department} />
          <TextLabel label="Responsable en el centro de acogida" text={contract.responsablePerson} />
          <TextLabel label="Fecha inicio" text={new Date(contract.startDate).toLocaleDateString()} />
          <TextLabel label="Fecha fin" text={new Date(contract.endDate).toLocaleDateString()} />
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
          <TextLabel label="Entidad de procedencia" text={contract.proccedenceEntity} />
          <TextLabel label="Departamento" text={contract.department} />
          <TextLabel label="Responsable en el centro de acogida" text={contract.responsablePerson} />
          <TextLabel label="Fecha inicio" text={new Date(contract.startDate).toLocaleDateString()} />
          <TextLabel label="Fecha fin" text={new Date(contract.endDate).toLocaleDateString()} />
        </SectionContent>
        <hr />
      </div>
    );
  }

  return <div>Tipo de contrato invalido</div>;
}
