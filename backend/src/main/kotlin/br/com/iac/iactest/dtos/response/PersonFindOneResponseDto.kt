package br.com.iac.iactest.dtos.response

import br.com.iac.iactest.entities.PersonEntity
import java.time.LocalDate
import java.util.*
import javax.persistence.*

class PersonFindOneResponseDto {
    lateinit var id: UUID
    lateinit var fullName: String
    lateinit var email: String
    lateinit var phone: String
    lateinit var birth: LocalDate

    lateinit var photoUrl: String

    constructor() {}
    constructor(
        id: UUID,
        fullName: String,
        email: String,
        phone: String,
        photoUrl: String,
        birth: LocalDate
    ) {
        this.id = id
        this.fullName = fullName
        this.email = email
        this.phone = phone
        this.photoUrl = photoUrl
        this.birth = birth
    }
}