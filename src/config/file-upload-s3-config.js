import multer from 'multer';
import multers3 from 'multer-s3';
import aws from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

aws.config.update({
    region: process.env.AWS_REGION,
    accesskey: process.env.AWS_ACCESS_KEY_ID,
    secretkey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new aws.S3();

const upload = multer({
    storage: multers3({
        s3: s3,
        bucket: process.env.BUCKET_NAME,
        metadata: function(req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function(req, file, cb) {
            cb(null, "tweet"+Date.now().toString())
        }
    })
});
export default upload;