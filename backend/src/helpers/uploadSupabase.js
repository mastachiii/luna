// Middleware for uploading stuff to supabase
const { decode } = require("base64-arraybuffer");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

async function uploadFile(req, res, next) {
    try {
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

module.exports = uploadFile;
