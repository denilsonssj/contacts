package br.com.iac.iactest.dtos.request

import java.time.LocalDate
import java.util.UUID

class PersonCreateRequestDto {

    lateinit var fullName: String

    lateinit var email: String

    lateinit var phone: String

    lateinit var birth: LocalDate

    constructor() {}
    constructor(
        fullName: String,
        email: String,
        phone: String,
        birth: LocalDate
    ) {
        this.fullName = fullName
        this.email = email
        this.phone = phone
        this.birth = birth
    }
}