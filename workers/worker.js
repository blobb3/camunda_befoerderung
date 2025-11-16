import { Camunda8 } from '@camunda8/sdk';
import * as fs from 'fs'; // Benötigt für das Deployment der BPMN-Datei

// 1. INITIALISIERUNG
// Explizite Adresse ist notwendig, wenn der Worker außerhalb des Docker-Netzwerks läuft.
const c8 = new Camunda8({
    zeebeGrpcAddress: 'localhost:26500'
});
const zeebe = c8.getZeebeGrpcApiClient();

console.log('Worker gestartet...');

// 2. PROZESS-DEPLOYMENT UND START (EINMALIGE AKTION)
// Diese Funktion stellt den Prozess bereit und startet eine Instanz.
async function deployAndStartProcess() {
    // PASSE DIESE WERTE AN DEINE BPMN-DATEI AN
    const processName = 'IST_PROZESS2.bpmn'; 
    const processId = 'IST_PROZESS2'; 

    try {
        console.log(`⏳ Starte Deployment von ${processName}...`);
        
        // Deployment
        const deployResult = await zeebe.deployProcess({
            definition: fs.readFileSync(processName), // Liest die BPMN-Datei aus dem Dateisystem
            name: processName,
        });
        console.log(`✅ Prozess deployed! Key: ${deployResult.key}`);

        // Instanz starten
        const startResult = await zeebe.createProcessInstance({
            bpmnProcessId: processId,
            variables: {
                "mitarbeiterId": "MA123",
                "befoerderungId": "BF001",
                "befoerderungSinnvoll": true,
                "antragVollstaendig": true,
                "befoerderungAngenommen": true,
                "gehaltsvorschlagAkzeptiert": true,
                "weitereGenehmigungen": false,
                "antragGenehmigt": true,
                "vertragAngenommen": true,
                "vorgesetzterGenehmigt": true
            }
        });
        console.log(`🚀 Prozessinstanz gestartet! Key: ${startResult.processInstanceKey}`);

    } catch (error) {
        console.error('❌ Deployment/Start Fehler:', error.message);
    }
}

// Funktion aufrufen:
deployAndStartProcess();

// 3. WORKER-REGISTRIERUNG
const jobTypes = [
    'send-rejection-notification',
    'send-application-to-hr-bp',
    'send-application-back',
    'send-application-to-cb-team',
    'send-recommendation-to-hr-bp',
    'send-rejection-reason',
    'send-hr-rejection-notice',
    'send-contract-to-employee',
    'send-contract-to-manager',
    'send-signed-contract-to-supervisor',
    'send-signed-contract-to-hr-bp',
    'notify-hr-rejection',
    'send-to-payroll'
];

jobTypes.forEach(jobType => {
    zeebe.createWorker({
        taskType: jobType,
        taskHandler: async (job) => {
            console.log(`Verarbeite Job: ${jobType}`);
            console.log('Job Variablen:', job.variables);

            // Simuliere E-Mail senden
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log(`✅ Job ${jobType} abgeschlossen`);

            return job.complete();
        }
    });

    console.log(`✅ Worker registriert für: ${jobType}`);
});

console.log('👂 Worker warten auf Jobs...');