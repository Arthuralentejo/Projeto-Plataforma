
const contactDal = require('./contacts')
const documentDal = require('./documents')
const studentModel = require('../domain/students')
const db = require('./dbConnection')
const contactModel = require('./contacts')

// class StudentsDAL {
//     static async load(studentId) {
//         var students = await db.query("SELECT student_id, name, surname, adress, birthdate, place_of_birth, scholarity, marital_status, relatives, employment_status, income, familyInconme FROM Students where student_id = $1", [studentId])
//     }
//     static loadAll() {
//     }
// }

async function init(studentId) {
    
    let students = await db.query("SELECT student_id, name, surname, adress, CAST(birthdate as CHAR(10)), place_of_birth, scholarity, marital_status, relatives, employment_status, income, familyInconme FROM Students where student_id = $1", [studentId])
    // console.table(students.rows)

    let contacts = await db.query("SELECT contact_type, contact_value FROM StudentContacts where student_id = $1", [studentId])

    let documents = await db.query("SELECT document_type, document_value FROM StudentDocuments where student_id = $1", [studentId])

    let ret = []

    students.rows.forEach(element => {

        let id = element.student_id

        /*
        let contact = async id => {
            contactDal.load(id).then(value => {
                return value
            }, err => {
                console.log(err)
            })

        };
        */

        // let document = documentDal.load(id)
        let item = new studentModel(element.name, element.surname, element.adress, element.birthdate, element.place_of_birth,
            element.scholarity, element.marital_status, element.familyinconme, element.relatives, element.employment_status,
            element.income, contacts.rows, documents.rows)

        ret.push(item)
        console.log("\n-------===== Change Conection =====--------")
        console.log(item)
        return (ret)
    });
}

init(1)