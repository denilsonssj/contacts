package br.com.iac.iactest.factories

import br.com.iac.iactest.entities.PersonEntity
import org.springframework.stereotype.Component
import java.util.UUID

import br.com.iac.iactest.dtos.request.PersonCreateRequestDto
import br.com.iac.iactest.dtos.request.PersonUpdateRequestDto
import br.com.iac.iactest.dtos.response.PersonCreateResponseDto
import br.com.iac.iactest.dtos.response.PersonFindOneResponseDto
import br.com.iac.iactest.dtos.response.PersonUpdateResponseDto

@Component
class PersonFactory {

    fun fromPersonCreateRequestDtoToPersonEntity(personCreateRequestDto: PersonCreateRequestDto): PersonEntity {
        return PersonEntity(
            UUID.randomUUID(),
            personCreateRequestDto.fullName,
            personCreateRequestDto.email,
            personCreateRequestDto.phone,
            byteArrayOf(),
            personCreateRequestDto.birth
        )
    }

    fun fromPersonEntityToPersonCreateResponseDto(personEntity: PersonEntity): PersonCreateResponseDto {
        return PersonCreateResponseDto(
            personEntity.id,
            personEntity.fullName,
            personEntity.email,
            personEntity.phone,
            personEntity.photoUrl,
            personEntity.birth
        )
    }

    fun fromPersonUpdateRequestDtoToPersonEntity(personUpdateRequestDto: PersonUpdateRequestDto): PersonEntity {
        return PersonEntity(
            personUpdateRequestDto.id,
            personUpdateRequestDto.fullName,
            personUpdateRequestDto.email,
            personUpdateRequestDto.phone,
            byteArrayOf(),
            personUpdateRequestDto.birth
        )
    }

    fun fromPersonEntityToPersonUpdateResponseDto(personEntity: PersonEntity): PersonUpdateResponseDto {
        return PersonUpdateResponseDto(
            personEntity.id,
            personEntity.fullName,
            personEntity.phone,
            personEntity.email,
            personEntity.photoUrl,
            personEntity.birth
        )
    }

    fun fromPersonEntityToPersonFindOneResponseDto(personEntity: PersonEntity): PersonFindOneResponseDto {
        return PersonFindOneResponseDto (
            personEntity.id,
            personEntity.fullName,
            personEntity.email,
            personEntity.phone,
            "",
            personEntity.birth
                )
    }
}