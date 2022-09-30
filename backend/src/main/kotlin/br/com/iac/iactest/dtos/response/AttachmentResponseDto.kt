package br.com.iac.iactest.dtos.response

import ch.qos.logback.core.util.FileSize
import java.math.BigInteger

class AttachmentResponseDto {
    lateinit var fileName: String;
    lateinit var url: String;
    lateinit var fileType: String;
    lateinit var fileSize: BigInteger;

    constructor() {}
    constructor(
        fileName: String,
        url: String,
        fileType: String,
        fileSize: BigInteger
    ) {
        this.fileName = fileName
        this.url = url
        this.fileType = fileType
        this.fileSize = fileSize
    }
}