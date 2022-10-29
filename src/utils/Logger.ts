import chalk from 'chalk';
import dayjs from 'dayjs';

export default class Logger {
    public static log = (args: any) => this.info(args);

    public static info = (args: any) => console.log(chalk.blue(`[${dayjs().format('DD-MM-YYYY HH:mm')}] [INFO]`), typeof args === 'string' ? chalk.blueBright(args) : args);

    public static warning = (args: any) => console.log(chalk.yellow(`[${dayjs().format('DD-MM-YYYY HH:mm')}] [WARN]`), typeof args === 'string' ? chalk.yellowBright(args) : args);

    public static error = (args: any) => console.log(chalk.red(`[${dayjs().format('DD-MM-YYYY HH:mm')}] [ERROR]`), typeof args === 'string' ? chalk.redBright(args) : args);
}
