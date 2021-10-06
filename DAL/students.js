const contactDal = require('./contacts')
const documentDal = require('./documents')
const contactModel = require('./contacts')
const studentModel = require('../domain/students')
const db = require('./dbConnection')

class student {
    static async load(studentId) {

        var students = await db.query("SELECT student_id, name, surname, adress, CAST(birthdate as CHAR(10)), place_of_birth, scholarity, marital_status, relatives, employment_status, income, familyInconme FROM Students where student_id = $1", [studentId])

        let element = students.rows[0]
        let id = element.student_id
        let contact = await contactDal.load(id)
        let document = await documentDal.load(id)

        let item = new studentModel(element.name, element.surname, element.adress, element.birthdate, element.place_of_birth,
            element.scholarity, element.marital_status, element.familyinconme, element.relatives, element.employment_status,
            element.income, contact, document)
        return item
    };



    static async loadAll() {

        var students = await db.query("SELECT student_id, name, surname, adress, CAST(birthdate as CHAR(10)), place_of_birth, scholarity, marital_status, relatives, employment_status, income, familyInconme FROM Students")

        return await Promise.all(students.rows.map(async function(element) {

            let id = element.student_id


            let contact = await contactDal.load(id)
            let document = await documentDal.load(id)

            return new studentModel(element.name, element.surname, element.adress, element.birthdate, element.place_of_birth,
                element.scholarity, element.marital_status, element.familyinconme, element.relatives, element.employment_status,
                element.income, contact, document)
        }))
    }
}
module.exports = student