const pool = require("../config/db");

const findOwnerByEmail = async (email) => {

    return await pool.query(
        "SELECT * FROM owners WHERE email=$1",
        [email]
    );

};

const createOwner = async (
    owner_name,
    organization_name,
    email,
    password
) => {

    return await pool.query(
        `
        INSERT INTO owners
        (
            owner_name,
            organization_name,
            email,
            password,
            is_verified
        )
        VALUES($1,$2,$3,$4,$5)
        RETURNING *
        `,
        [
            owner_name,
            organization_name,
            email,
            password,
            true
        ]
    );

};

module.exports = {
    findOwnerByEmail,
    createOwner
};