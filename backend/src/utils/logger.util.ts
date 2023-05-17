import {
    createLogger,
    format,
    transports
} from 'winston'

const filenames = {
    error: 'error.log',
    combined: 'combined.log'
}

const myFormat = format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

var currentFile = module.filename.split('/').slice(-1)[0];

const winstonLogger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.label({ label: currentFile }),
        format.errors({ stack: true }),
        format.splat(),
        myFormat
    ),

    transports: [
        new transports.File({
            filename: filenames.error,
            level: 'error'
        }),
        new transports.File({
            filename: filenames.combined
        })
    ]
})

const shouldLog = process.env.NODE_ENV === "development"


export default class Logger {
    static info = (...args: any[]) => {
        if (shouldLog) console.info(args)

        // write to file
        winstonLogger.info(args)
    }

    static error = (...args: any[]) => {
        if (shouldLog) console.error(args)

        // write to file
        winstonLogger.error(args)
    }

    static log = (...args: any[]) => {
        if (shouldLog) console.log(...args)

        // write to file
        winstonLogger.info(args)
    }
}
