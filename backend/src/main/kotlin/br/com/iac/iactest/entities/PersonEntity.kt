package br.com.iac.iactest.entities

import java.time.LocalDate
import java.util.UUID
import javax.persistence.*

@Entity
@Table(name ="persons")
class PersonEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    lateinit var id: UUID

    @Column(name = "full_name")
    lateinit var fullName: String

    @Column(name = "email")
    lateinit var email: String

    @Column(name = "phone")
    lateinit var phone: String

    @Column(name = "birth")
    lateinit var birth: LocalDate

    @Column(name = "photo")
    @Lob
    lateinit var photoUrl: ByteArray

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