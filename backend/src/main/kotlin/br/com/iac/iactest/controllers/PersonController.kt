package br.com.iac.iactest.controllers

import br.com.iac.iactest.dtos.request.PersonCreateRequestDto
import br.com.iac.iactest.dtos.request.PersonUpdateRequestDto
import br.com.iac.iactest.dtos.response.PersonFindOneResponseDto
import br.com.iac.iactest.entities.PersonEntity
import br.com.iac.iactest.factories.PersonFactory
import br.com.iac.iactest.services.PersonService
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder
import java.util.*

@RestController
@RequestMapping("/persons")
class PersonController(
    private val personService: PersonService,
    private val personFactory: PersonFactory
) {

    @GetMapping
    fun findAll(): MutableList<PersonEntity> {
        return personService.findAll();
    }

    @RequestMapping(
        path = ["/update"],
        method = [RequestMethod.POST],
        consumes = [MediaType.MULTIPART_FORM_DATA_VALUE]
    )
    fun updateOne(
        @RequestPart("person")
        personUpdateRequestDto: PersonUpdateRequestDto,
        @RequestPart("photo")
        photo: MultipartFile
    ): Boolean {
        return personService.updateOne(personUpdateRequestDto, photo.bytes);
    }

    @DeleteMapping("/{id}")
    fun deleteOneById(@PathVariable id: UUID) {
        personService.deleteOneById(id)
    }

    @GetMapping("/{id}")
    fun getOneById(@PathVariable id: UUID): ResponseEntity<PersonFindOneResponseDto> {
        val findPerson = personService.findOneById(id)
        if (findPerson.isPresent) {
            val url: String = MvcUriComponentsBuilder
                .fromMethodName(
                    PersonController::class.java,
                    "getUrlPhotoFromUserById",
                    id.toString()
                )
                .build()
                .toString()
            val personFindOneResponseDto: PersonFindOneResponseDto = personFactory
                .fromPersonEntityToPersonFindOneResponseDto(findPerson.get())
            personFindOneResponseDto.photoUrl = url
            return ResponseEntity.ok(personFindOneResponseDto)
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
    }

    @GetMapping("/{id}/profile-picture")
    fun getUrlPhotoFromUserById(@PathVariable id: UUID): ResponseEntity<Any> {
        val findPersonEntity = personService.findOneById(id)
        if (findPersonEntity.isPresent) {
            val image: ByteArray = findPersonEntity.get().photoUrl
            return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(MediaType.IMAGE_JPEG_VALUE))
                .header(
                    HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=\"${System.currentTimeMillis()}\""
                )
                .body(image)
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
    }

    @RequestMapping(
        path = ["/create"],
        method = [RequestMethod.POST],
        consumes = [MediaType.MULTIPART_FORM_DATA_VALUE]
    )
    fun saveOne(
        @RequestPart("person")
        personCreateRequestDto: PersonCreateRequestDto,
        @RequestPart("photo")
        photo: MultipartFile
    ): ResponseEntity<PersonEntity> {
        val foundPersonEntity = personService.saveOne(personCreateRequestDto, photo.bytes)
        if (foundPersonEntity.isPresent) {
            return ResponseEntity.ok(foundPersonEntity.get())
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
    }

}