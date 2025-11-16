import { Camunda8 } from '@camunda8/sdk';

const c8 = new Camunda8();
const zeebe = c8.getZeebeGrpcApiClient();

console.log('🚀 Worker gestartet...');

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
      console.log(`📧 Verarbeite Job: ${jobType}`);
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