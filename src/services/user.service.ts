import fs from 'node:fs/promises';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

type requestType = "user" | "repos";

const userUrl = process.env.GITHUB_USER_URL;
const reposUrl = process.env.GITHUB_REPOS_URL;

const pathData = process.env.DATA_FILE_PATH;

class UserService {

    async doRequest (requestType:requestType) {
        if (requestType === 'user' && userUrl !== undefined) {
            const response = await fetch(userUrl);
            const data = response.json();
            return data;
        } else if (reposUrl !== undefined && requestType === 'repos') {
            const response = await fetch(reposUrl);
            const data = response.json();
            return data;
        }
    }

    async getData() {
        const data_path = process.env.DATA_FILE_PATH;
        if (data_path !== undefined) {
            const content = await  fs.readFile(path.join(process.cwd(),data_path));
            const data:JSON = JSON.parse(content.toString());
            return data;
        }
    }

    async writeData(data:string) {
        const data_file = process.env.DATA_FILE_PATH;
        if (data_file !== undefined && data_file !== '') {
            const pathFile = path.join(process.cwd(),data_file);
            const writer = fs.writeFile(pathFile,data);
            await writer;
        }
    }

    async syncData() {
        const repos = await this.doRequest('repos');
        const user = await this.doRequest('user');
        const data = {repos, user,};

        this.writeData(`[${JSON.stringify(data)}]`);
    }
}

export default UserService;