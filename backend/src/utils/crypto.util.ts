import crypto from "crypto";


const config = {
    size: 32,
    algorithm: "sha256",
    encoding: "hex",
}

export const createCode = () => {
    const code = crypto.randomBytes(config.size).toString(config.encoding as BufferEncoding);
    return code;
}


export const createHash = (token: string) => {
    const hash = crypto
        .createHash(config.algorithm)
        .update(token)
        .digest(config.encoding as crypto.BinaryToTextEncoding);

    return hash;
}


export const verifyHash = (token: string, hash: string) => {
    const newHash = createHash(token);
    return newHash === hash;
}


/**
 * create a verification object to use for email verification, password reset etc.
 * @param expiresInMin expiry in minutes
 * @returns verification object
 */
export const createVerificationTokens = (expiresInMin: number) => {
    const code = createCode();
    const hash = createHash(code);

    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + expiresInMin * 60 * 1000);

    return {
        code,
        hash,
        createdAt,
        expiresAt,
    };
}