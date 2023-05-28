import {
  Accreditation,
  Ascendant,
  Degree,
  Descendant,
  Person,
} from "@/app/person-columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Checkbox } from "@/components/checkbox";
import { Contract } from "@/components/contract";
import { Label } from "@/components/label";
import PersonSection from "@/components/person-section";
import SectionContent from "@/components/section-content";
import TextLabel from "@/components/text-label";
import http from "@/lib/http";

type BankAccount = {
  id: string;
  name: string;
  iban: string;
};

type EmergencyContact = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  relationship: keyof typeof emergencyContactRelationships;
};

const emergencyContactRelationships = {
  0: "Pareja",
  1: "Padre/Madre",
  2: "Hermano/a",
  3: "Otros",
};

export const maximumStudiesCategories = {
  0: "Doctorado universitario",
  1: "Grado de más de 240 ECTS**, Licenciatura, Arquitectura, Ingeniería, Másteres, especialidad en Ciencias de la Salud y Equivalentes",
  2: "Grado de 240 ECTS, Diplomatura, Arquitectura e Ingeniería Técnicas y equivalentes; postgrado universitario de menos de 1 año",
  3: "Ciclo Formativo de Grado Superior, FPII, y equivalentes; título propio universitario de 2 o más años que requiere bachillerato",
  4: "Bachiller, BUP, COU, Bachiller Superior, Ciclo Formativo de Grado Medio, FPI, Grado Medio/Profesional de Música y Danza, FP Básica, y similares, EO Idiomas - nivel avanzado",
  5: "Otros estudios",
};

export const dedicationOptions = {
  0: "Exclusiva",
  1: "Plena",
};

export const titulationOptions = {
  0: "Oficial",
  1: "Título propio",
};

export const degreeTypes = {
  0: "Bachiller o equivalente",
  1: "Ciclo Formativo de Grado Medio o equivalente",
  2: "Ciclo Formativo de Grado Superior o equivalente",
  3: "Grado / Licenciatura/ Diplomatura",
  4: "Máster",
  5: "Doctorado",
  6: "Otros",
};

export const evaluationTypes = {
  0: "Figura de profesor universitario contratado",
  1: "Evaluación de los tramos de investigación",
};

export const professionalTypes = {
  0: "Personal Docente e Investigador",
  1: "Personal de Administración y Servicios",
  2: "Otros",
};

export const professionalFaculties = {
  0: "Facultad de Ciencias de la Salud",
  1: "Facultad de Ciencias Sociales y Humanidades",
  2: "Escuela Politécnica Superior",
};

export const professionalDepartments = {
  0: "Administración",
  1: "Rectorado",
  2: "Secretaría General",
  3: "Secretaría Académica",
  4: "Servicio de Alumnos",
  5: "Negociado de Amisión",
  6: "CEMU",
  7: "Oficina de Relaciones Internacionales",
  8: "Gabinete de Calidad",
  9: "Gabinete de Comunicación",
  10: "OTRI",
  11: "Recepción - Conserjería",
  12: "Webmáster",
  13: "Ordenación Académica",
  14: "Biblioteca",
  15: "-",
};

export const professionalFields = [
  "Ciencias exactas y naturales",
  "Ingeniería y tecnología",
  "Ciencias médicas",
  "Ciencias de la agricultura y veterinaria",
  "Ciencias sociales",
  "Humanidades y las artes",
] as const;

async function getPerson(id: string): Promise<Person> {
  const data = await (
    await http(`/persons/${id}`, { cache: "no-store" })
  ).json();

  return data;
}

async function getPersonBankAccounts(personId: string) {
  const data = await (
    await http(`/persons/${personId}/bank-accounts`, { cache: "no-store" })
  ).json();

  return data;
}

async function getPersonEmergencyContacts(personId: string) {
  const data = await (
    await http(`/persons/${personId}/emergency-contacts`, { cache: "no-store" })
  ).json();

  return data;
}

async function getPersonContracts(personId: string) {
  const data = await (
    await http(`/persons/${personId}/contracts`, { cache: "no-store" })
  ).json();

  return data;
}

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const [person, bankAccounts, emergencyContacts, contracts] = await Promise.all([
    getPerson(id),
    getPersonBankAccounts(id),
    getPersonEmergencyContacts(id),
    getPersonContracts(id)
  ]);

  const ascendantsList = person.ascendents.map((ascendant: Ascendant) => (
    <div key={`ascendant-${ascendant.id}`} className="mb-3">
      <div className="grid grid-flow-row grid-cols-3">
        <TextLabel label="Nombre" text={ascendant.name} />
        <TextLabel
          label="Fecha de nacimiento"
          text={new Date(ascendant.dateOfBirth).toLocaleDateString()}
        />
        <TextLabel
          label="% discapacidad"
          text={ascendant.discapacity ? `${ascendant.discapacity}%` : "N/A"}
        />
        <TextLabel
          label="Discapacidad necesita ayuda"
          text={ascendant.discapacityNeedsHelp ? "Si" : "No"}
        />
        <TextLabel
          label="Convivencia unica"
          text={ascendant.uniqueConvivence ? "Si" : "No"}
        />
      </div>
      <hr />
    </div>
  ));

  const descendantsList = person.descendents.map((descendant: Descendant) => (
    <div key={`descendant-${descendant.id}`} className="mb-3">
      <div className="grid grid-flow-row grid-cols-3">
        <TextLabel label="Nombre" text={descendant.name} />
        <TextLabel
          label="Fecha de nacimiento"
          text={new Date(descendant.dateOfBirth).toLocaleDateString()}
        />
        <TextLabel
          label="% discapacidad"
          text={descendant.discapacity ? `${descendant.discapacity}%` : "N/A"}
        />
        <TextLabel
          label="Discapacidad necesita ayuda"
          text={descendant.discapacityNeedsHelp ? "Si" : "No"}
        />
        <TextLabel
          label="Convivencia unica"
          text={descendant.uniqueConvivence ? "Si" : "No"}
        />
        <TextLabel label="Adoptado" text={descendant.adopted ? "Si" : "No"} />
      </div>
      <hr />
    </div>
  ));

  const bankAccountsList = bankAccounts.data.map((bankAccount: BankAccount) => (
    <div key={`bank-account-${bankAccount.id}`} className="mb-3">
      <div className="grid grid-flow-row grid-cols-3">
        <TextLabel label="Nombre" text={bankAccount.name} />
        <TextLabel label="IBAN" text={bankAccount.iban} />
      </div>
      <hr />
    </div>
  ));

  const emergencyContactsList = emergencyContacts.data.map(
    (emergencyContact: EmergencyContact) => (
      <div key={`emergency-contact-${emergencyContact.id}`} className="mb-3">
        <div className="grid grid-flow-row grid-cols-3">
          <TextLabel label="Nombre" text={emergencyContact.name} />
          <TextLabel label="Dirección" text={emergencyContact.address} />
          <TextLabel
            label="Numero de teléfono"
            text={emergencyContact.phoneNumber}
          />
          <TextLabel
            label="Relación"
            text={emergencyContactRelationships[emergencyContact.relationship]}
          />
        </div>
        <hr />
      </div>
    )
  );

  const degreesList = person.academics?.degrees?.map((degree: Degree) => (
    <div key={`degree-${degree.id}`} className="mb-3">
      <div className="grid grid-flow-row grid-cols-3">
        <TextLabel label="Nombre" text={degree.name} />
        <TextLabel label="Tipo" text={degreeTypes[degree.type]} />
        <TextLabel
          label="Fecha"
          text={new Date(degree.date).toLocaleDateString()}
        />
      </div>
      <hr />
    </div>
  ));

  const accreditationsList = person.academics?.accreditations?.map(
    (accreditation: Accreditation) => (
      <div key={`accreditation-${accreditation.id}`} className="mb-3">
        <div className="grid grid-flow-row grid-cols-3">
          <TextLabel label="Acreditación" text={accreditation.accreditation} />
          <TextLabel
            label="Agencia acreditadora"
            text={accreditation.accreditationAgency}
          />
          <TextLabel
            label="Evaluación del profesorado"
            text={evaluationTypes[accreditation.evaluationType]}
          />
          <TextLabel
            label="Fecha de acreditación"
            text={new Date(accreditation.date).toLocaleDateString()}
          />
          <TextLabel
            label="Fecha inicio"
            text={new Date(accreditation.startDate).toLocaleDateString()}
          />
          <TextLabel
            label="Fecha fin"
            text={new Date(accreditation.endDate).toLocaleDateString()}
          />
        </div>
        <hr />
      </div>
    )
  );

  const contractsList = contracts.data.map((contract: Contract) => <Contract key={`contract-${contract.id}`} data={contract} />)

  return (
    <div className="pl-32 pr-32">
      <h1 className="mb-10 text-3xl">Persona</h1>
      <Card>
        <CardHeader>
          <CardTitle>{`${person.name} ${person.lastName}`}</CardTitle>
        </CardHeader>
        <CardContent>
          <PersonSection title="Datos personales" />
          <SectionContent>
            <TextLabel label="Nombre" text={person.name} />
            <TextLabel label="Apellidos" text={person.lastName} />
            <TextLabel
              label="Documento de identidad"
              text={person.idDocument}
            />
            <TextLabel
              label="Nº seguridad social"
              text={person.socialSecurity}
            />
            <TextLabel label="Nacionalidad" text={person.nationality} />
            <TextLabel
              label="Fecha de nacimiento"
              text={new Date(person.dateOfBirth).toLocaleDateString()}
            />
            <TextLabel
              label="Sexo"
              text={person.sex === true ? "Hombre" : "Mujer"}
            />
            <TextLabel
              label="% discapacidad"
              text={
                person.discapacityLevel ? `${person.discapacityLevel}%` : "N/A"
              }
            />
            {person.discapacityLevel ? (
              <TextLabel
                label="Discapacidad necesita ayuda"
                text={person.discapacityNeedsHelp ? "Si" : "No"}
              />
            ) : null}
          </SectionContent>

          <PersonSection title="Datos de contacto" />
          <SectionContent>
            <TextLabel label="Dirección" text={person.line} />
            <TextLabel label="Código postal" text={person.postalCode} />
            <TextLabel label="Ciudad" text={person.city} />
            <TextLabel label="Provincia" text={person.division} />
            <TextLabel label="País" text={person.country} />
            <TextLabel label="Numero móvil" text={person.mobilePhoneNumber} />
            <TextLabel label="Numero telefónico" text={person.phoneNumber} />
            <TextLabel label="Email personal" text={person.personalEmail} />
            <TextLabel
              label="Email institucional"
              text={person.institutionalEmail}
            />
          </SectionContent>

          <PersonSection title="Situación familiar" />
          <div>
            <div className="flex flex-row mb-3">
              <Checkbox
                checked={person.civilState === 0 || person.civilState === 1}
                className="mr-3"
                id="civil-state-0"
              />
              <Label htmlFor="civil-state-0">
                Soltero/a, viudo/a, divorciado/a o separado/a legalmente con
                hijos solteros menores de 18 años o incapacitados judicialmente
                y sometidos a patria potestad prorrogada o rehabilitada que
                conviven exclusivamente con Vd. sin convivir también con el otro
                progenitor, siempre que proceda consignar al menos un hijo o
                descendiente en el apartado de este documento.
              </Label>
            </div>
            <div className="flex flex-row mb-3">
              <Checkbox
                checked={person.civilState === 2}
                className="mr-3"
                id="civil-state-0"
              />
              <Label htmlFor="civil-state-0">
                Casado/a y no separado/a legalmente cuyo cónyuge no obtiene
                rentas superiores a 1.500 euros anuales, excluidas las extentas.
              </Label>
            </div>
            <div className="flex flex-row mb-3">
              <Checkbox
                checked={person.civilState === 3}
                className="mr-3"
                id="civil-state-0"
              />
              <Label htmlFor="civil-state-0">
                Situación familiar distinta de las dos anteriores (solteros sin
                hijos, casados cuyo cónyuge obtiene rentas superiores a 1.500
                euros anuales, ... etc.)
                <br />
                (Marque también esta casilla si no desea manifestar su situación
                familiar)
              </Label>
            </div>
            {person.civilState === 2 ? (
              <TextLabel label="NIF cónyuge" text={person.partnerIdDocument} />
            ) : null}
          </div>

          <PersonSection title="Familiares" />
          <div className="mb-3">
            <h3 className="text-lg mb-2">Ascendientes</h3>
            {ascendantsList.length > 0 ? (
              <div>{ascendantsList}</div>
            ) : (
              <span>Esta persona no tiene ascendientes.</span>
            )}
            <h3 className="text-lg mb-2">Descendientes</h3>
            {descendantsList.length > 0 ? (
              <div>{descendantsList}</div>
            ) : (
              <span>Esta persona no tiene descendientes.</span>
            )}
          </div>

          <PersonSection title="Datos bancarios" />
          <div className="mb-3">
            {bankAccountsList.length > 0 ? (
              <div>{bankAccountsList}</div>
            ) : (
              <span>Esta persona no tiene cuentas bancarias.</span>
            )}
          </div>

          <PersonSection title="Contactos de emergencia" />
          <div className="mb-3">
            {emergencyContactsList.length > 0 ? (
              <div>{emergencyContactsList}</div>
            ) : (
              <span>Esta persona no tiene contactos de emergencia.</span>
            )}
          </div>

          <PersonSection title="Datos académicos" />
          <SectionContent>
            <TextLabel
              label="Maxima categoría de estudios finalizados"
              text={
                maximumStudiesCategories[person.academics.maximumStudies] ??
                "N/A"
              }
            />
            <TextLabel
              label="Agencia acreditadora"
              text={person.academics.accreditationAgency}
            />
            <TextLabel
              label="Dedicación"
              text={dedicationOptions[person.academics.dedication]}
            />
            <TextLabel
              label="Titulación"
              text={titulationOptions[person.academics.titulation]}
            />
          </SectionContent>
          <h3 className="text-lg mb-2">Titulaciones</h3>
          {degreesList?.length > 0 ? (
            <div>{degreesList}</div>
          ) : (
            <span>Esta persona no tiene titulaciones.</span>
          )}
          <h3 className="text-lg mb-2">Acreditaciones</h3>
          {accreditationsList?.length > 0 ? (
            <div>{accreditationsList}</div>
          ) : (
            <span>Esta persona no tiene acreditaciones.</span>
          )}

          <PersonSection title="Datos profesionales" />
          <SectionContent>
            <TextLabel
              label="Tipo"
              text={professionalTypes[person.professional?.type]}
            />
            <TextLabel
              label="Facultad/escuela"
              text={professionalFaculties[person.professional?.faculty]}
            />
            <TextLabel
              label="Departamento"
              text={professionalDepartments[person.professional?.department]}
            />
            <TextLabel
              label="Campo de conocimiento"
              text={person.professional?.field}
            />
            <TextLabel label="Cargo" text={person.professional?.position} />
          </SectionContent>

          <PersonSection title="Relación jurídica" />
          {contractsList.length > 0 ? (
            contractsList
          ) : (
            <span>Esta persona no tiene contratos.</span>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
