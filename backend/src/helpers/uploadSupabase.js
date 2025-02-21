// Middleware for uploading stuff to supabase
const { decode } = require("base64-arraybuffer");
const { createClient } = require("@supabase/supabase-js");
const { v4: uuidv4 } = require("uuid");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

async function uploadFile(req, res, next) {
    try {
        if (!req.file) return next();

        const file = decode(req.file.buffer.toString("base64"));
        const path = `${req.user.username}/${req.file.originalname.toLowerCase()}`;

        await supabase.storage.from("luna").upload(path, file, {
            contentType: "image",
        });

        const { data } = await supabase.storage.from("luna").getPublicUrl(path);

        req.publicUrl = data.publicUrl;

        next();
    } catch (err) {
        next(err);
    }
}

function uploadFiles(req, res, next) {
    if (!req.files) next();

    Object.keys(req.files).forEach(key => {
        const file = req.files[key][0];

        const fileUpload = decode(file.buffer.toString("base64"));
        const path = `awidjaowidj/${uuidv4()}`;

        supabase.storage.from("luna").upload(path, fileUpload, {
            contentType: "image",
        });

        const { data } = supabase.storage.from("luna").getPublicUrl(path);

        req[file.fieldname] = data.publicUrl;
    });

    next();
}

module.exports = { uploadFile, uploadFiles };
