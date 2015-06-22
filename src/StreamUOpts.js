/** @namespace StreamUOpts */
this.StreamUOpts = this.StreamUOpts || {
	/**
	 * StreamTypeEnum/adTypeBinary:
	 *     Set to ADODB.Stream#Type to read file as binary.
	 *     {@link http://msdn.microsoft.com/ja-jp/library/cc389884.aspx}
	 * @memberof StreamUOpts
	 * @const
	 */
	adTypeBinary: 1,
	/**
	 * StreamTypeEnum/adTypeText:
	 *     Set to ADODB.Stream#Type to read file as text.
	 *     {@link http://msdn.microsoft.com/ja-jp/library/cc389884.aspx}
	 * @memberof StreamUOpts
	 * @const
	 */
	adTypeText: 2,
	/**
	 * StreamReadEnum/adReadAll:
	 *     Set to ADODB.Stream#ReadText to read all text.
	 *     {@link http://msdn.microsoft.com/ja-jp/library/cc389881.aspx}
	 * @memberof StreamUOpts
	 * @const
	 */
	adReadAll: -1,
	/**
	 * StreamReadEnum/adReadLine:
	 *     Set to ADODB.Stream#ReadText to read text per line.
	 *     {@link http://msdn.microsoft.com/ja-jp/library/cc389881.aspx}
	 * @memberof StreamUOpts
	 * @const
	 */
	adReadLine: -2,
	/**
	 * StreamWriteEnum/adWriteChar:
	 *     Set to ADODB.Stream#WriteText to write text without line break.
	 *     {@link http://msdn.microsoft.com/ja-jp/library/cc389886.aspx}
	 * @memberof StreamUOpts
	 * @const
	 */
	adWriteChar: 0,
	/**
	 * StreamWriteEnum/adWriteLine:
	 *     Set to ADODB.Stream#WriteText to write text with line break.
	 *     {@link http://msdn.microsoft.com/ja-jp/library/cc389886.aspx}
	 * @memberof StreamUOpts
	 * @const
	 */
	adWriteLine: 1,
	/**
	 * SaveOptionsEnum/adSaveCreateNotExist:
	 *     Set to ADODB.Stream#SaveToFile to create the new file.
	 *     {@link http://msdn.microsoft.com/ja-jp/library/cc389870.aspx}
	 * @memberof StreamUOpts
	 * @const
	 */
	adSaveCreateNotExist: 1,
	/**
	 * SaveOptionsEnum/adSaveCreateOverWrite:
	 *     Set to ADODB.Stream#SaveToFile to overwrite the file.
	 *     {@link http://msdn.microsoft.com/ja-jp/library/cc389870.aspx}
	 * @memberof StreamUOpts
	 * @const
	 */
	adSaveCreateOverWrite: 2,
	/**
	 * LineSeparatorsEnum/adCR:
	 *     Set to ADODB.Stream#LineSeparator to set line separator to CR(\r)
	 * @memberof StreamUOpts
	 * @const
	 * https://msdn.microsoft.com/ja-jp/library/cc389826.aspx
	 */
	adCR: 13,
	/**
	 * LineSeparatorsEnum/adCRLF:
	 *     Set to ADODB.Stream#LineSeparator to set line separator to CRLF(\r\n)
	 * @memberof StreamUOpts
	 * @const
	 * https://msdn.microsoft.com/ja-jp/library/cc389826.aspx
	 */
	adCRLF: -1,
	/**
	 * LineSeparatorsEnum/adLF:
	 *     Set to ADODB.Stream#LineSeparator to set line separator to LF(\n)
	 * @memberof StreamUOpts
	 * @const
	 * https://msdn.microsoft.com/ja-jp/library/cc389826.aspx
	 */
	adLF: 10
};