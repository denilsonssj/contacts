package br.com.iac.iactest.services

import br.com.iac.iactest.dtos.request.PersonCreateRequestDto
import br.com.iac.iactest.dtos.request.PersonUpdateRequestDto
import br.com.iac.iactest.dtos.response.AttachmentResponseDto
import br.com.iac.iactest.dtos.response.PersonFindOneResponseDto
import br.com.iac.iactest.entities.PersonEntity
import br.com.iac.iactest.factories.PersonFactory
import br.com.iac.iactest.repositories.PersonRepository
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import java.io.File
import java.io.FileOutputStream
import java.math.BigInteger
import java.util.*
import javax.transaction.Transactional

@Service
class PersonService(
    private val personRepository: PersonRepository,
    private val personFactory: PersonFactory
) {

    fun findAll(): MutableList<PersonEntity> {
        return personRepository.findAll(Sort.by("fullName"))
    }

    @Transactional
    fun updateOne(personUpdateRequestDto: PersonUpdateRequestDto, photo: ByteArray): Boolean {
        val foundPerson = personRepository.findById(personUpdateRequestDto.id);
        if (foundPerson.isPresent) {
            var personToUpdate: PersonEntity = foundPerson.get();
            val p = personFactory.fromPersonUpdateRequestDtoToPersonEntity(personUpdateRequestDto)
            p.photoUrl = photo
            personRepository.save(p)
            return true;
        }
        return false;
    }

    @Transactional
    fun deleteOneById(id: UUID): Boolean {
        val foundPersonEntity = personRepository.findById(id)
        if (foundPersonEntity.isPresent) {
            personRepository.deleteById(id)
            return true
        }
        return false
    }

    fun findOneById(id: UUID): Optional<PersonEntity> {
        return personRepository.findById(id)
    }

    @Transactional
    fun saveOne(personCreateRequestDto: PersonCreateRequestDto, photo: ByteArray): Optional<PersonEntity> {
        val foundPerson: Optional<PersonEntity> = personRepository
            .findByEmail(personCreateRequestDto.email)
        if (foundPerson.isEmpty) {
            val personToSave: PersonEntity = personFactory
                .fromPersonCreateRequestDtoToPersonEntity(personCreateRequestDto)
            personToSave.photoUrl = photo
            return Optional.of(personRepository.save(personToSave))
        }
        return Optional.empty();
    }

}