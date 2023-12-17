import fs from 'node:fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import boom, { Boom } from '@hapi/boom';
dotenv.config();

/**
 * TODO:
 * add support to BoomJS error handler for http
 * and solve the middleware type error.
 */

interface ReposData {
    repos: JSON[]
}

const reposUrl = process.env.GITHUB_REPOS_URL;
class ReposService {

    async doRequest() {
        try {
            if (reposUrl !== undefined) {
                const response = await fetch(reposUrl);
                const data = response.json();
                return data;
            }
        } catch {
            throw boom.internal();
        }
    }

    async getData(): Promise<ReposData | undefined> {
        try {
            const data_path = process.env.DATA_FILE_PATH;
            if (data_path !== undefined) {
                const access = await fs.access(path.join(process.cwd(),data_path), fs.constants.F_OK);
                const content = await fs.readFile(path.join(process.cwd(), data_path));
                const data: ReposData = JSON.parse(content.toString());
                return data;
            }
        } catch {
            await this.syncData();
            throw boom.internal();
        }
    }

    async writeData(data: string) {
        const data_file = process.env.DATA_FILE_PATH;
        if (data_file !== undefined && data_file !== '') {
            const pathFile = path.join(process.cwd(), data_file);
            const writer = fs.writeFile(pathFile, data);
            await writer;
        }
    }

    async syncData() {
        const repos = await this.doRequest();
        this.writeData(JSON.stringify(repos));
    }

    async getSome(count: number) {
        const data = await this.getData();
        let objs: JSON[] = [];
        if (data?.repos.length !== undefined) {
            if (data.repos.length < count ?? count < 0) throw boom.badRequest();
            for (let i = 0; i <= count; i++) {
                objs.push(data.repos[i]);
            }
            return objs;
        }
    }
}

export default ReposService;