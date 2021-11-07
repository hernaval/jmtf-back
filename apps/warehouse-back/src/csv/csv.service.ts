import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import { resolve } from 'path';
import { rejects } from 'assert';

@Injectable()
export class CsvService {
    extractDataFromFile = async (filename: string): Promise<any[]> => {
        let results: any = [];

        return new Promise((resolve, reject) => {
            fs.createReadStream(filename)
            .pipe(csvParser())
            .on('data', (data) => {
                results.push(data)
            })
            .on('end', () => {
                resolve(results)
            })
        })
        
    }

}
