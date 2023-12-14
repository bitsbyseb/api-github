import fs from 'node:fs/promises';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

interface ReposData {
    repos: JSON[]
}

const reposUrl = process.env.GITHUB_REPOS_URL;

class UserService {

    async doRequest() {
        if (reposUrl !== undefined) {
            const response = await fetch(reposUrl);
            const data = response.json();
            return data;
        }
    }

    async getData(): Promise<ReposData | undefined> {
        const data_path = process.env.DATA_FILE_PATH;
        if (data_path !== undefined) {
            const content = await fs.readFile(path.join(process.cwd(), data_path));
            const data: ReposData = JSON.parse(content.toString());
            return data;
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
        const repos = data?.repos;
        if (repos !== undefined) {
            for (let i = 0; i < count; i++) {
                objs.push(repos[i]);
            }
        }
        return objs;
    }
}

export default UserService;