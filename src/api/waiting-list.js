import {Readable} from 'stream';
import fetch from 'node-fetch';
import * as FormData from 'form-data';

const FORM_FIELDS = {
    INTRESTED: 'entry.444371189',
    EMAIL: 'emailAddress'
}

export default async function handler(req, res) {
    const GOOGLE_FORM_ID = process.env.GOOGLE_FORM_ID
    const email = req.body.email
    
    const form = new FormData();
    form.append(FORM_FIELDS.EMAIL, req.body.email);
    form.append(FORM_FIELDS.INTRESTED, 'Yes');
    
    try {
        console.log('form', JSON.stringify(form))
        const gfRes = await fetch(`https://docs.google.com/forms/u/1/d/e/${GOOGLE_FORM_ID}/formResponse`, {
            method: 'POST',
            body: form
        })
        console.log('response', gfRes.status)
        if (gfRes.status === 200) {
            res.status(200).json({ message: `${email} added to waiting list` })
            return;
        } else {
            res.status(500).json({ message: `Google forms request failed with ${gfRes.status}` })
            return;
        }
    } catch(e) {
        console.log(e)
        res.status(500).json({ message: `Failed adding ${email} to waiting list` })
        return;
    }
}