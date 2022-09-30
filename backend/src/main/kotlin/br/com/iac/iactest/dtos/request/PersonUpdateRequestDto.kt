package br.com.iac.iactest.dtos.request

import java.time.LocalDate
import java.util.UUID

class PersonUpdateRequestDto {
    lateinit var id: UUID;

    lateinit var fullName: String

    lateinit var email: String

    lateinit var phone: String

    lateinit var birth: LocalDate

    constructor() {}
    constructor(
        id: UUID,
        fullName: String,
        email: String,
        phone: String,
        birth: LocalDate
    ) {
        this.id = id
        this.fullName = fullName
        this.email = email
        this.phone = phone
        this.birth = birth
    }
}