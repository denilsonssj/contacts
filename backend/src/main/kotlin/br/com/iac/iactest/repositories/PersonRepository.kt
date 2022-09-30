package br.com.iac.iactest.repositories

import java.util.UUID
import java.util.Optional
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

import br.com.iac.iactest.entities.PersonEntity

@Repository
interface PersonRepository: JpaRepository<PersonEntity, UUID> {
    fun findByEmail(email: String): Optional<PersonEntity>
}