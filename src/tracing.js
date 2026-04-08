const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { PrismaInstrumentation } = require('@prisma/instrumentation');

const sdk = new NodeSDK({
  serviceName: 'bookmark-api',
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
  }),
  instrumentations: [getNodeAutoInstrumentations(), new PrismaInstrumentation()],
});

sdk.start();

process.on('SIGTERM', () => sdk.shutdown());
