package br.com.iac.iactest.dtos.response

import java.time.LocalDate
import java.util.UUID

class PersonUpdateResponseDto {
    lateinit var id: UUID;

    lateinit var fullName: String

    lateinit var email: String

    lateinit var phone: String

    lateinit var photoUrl: ByteArray

    lateinit var birth: LocalDate

    constructor() {}
    constructor(
        id: UUID,
        fullName: String,
        email: String,
        phone: String,
        photoUrl: ByteArray,
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