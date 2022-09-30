package br.com.iac.iactest

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class IacTestApplication

fun main(args: Array<String>) {
	runApplication<IacTestApplication>(*args)
}
