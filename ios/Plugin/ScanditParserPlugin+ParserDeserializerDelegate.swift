import ScanditParser

extension ScanditParserNative: ParserDeserializerDelegate {
    public func parserDeserializer(_ parserDeserializer: ParserDeserializer,
                                   didStartDeserializingParser parser: Parser,
                                   from JSONValue: JSONValue) { }

    public func parserDeserializer(_ parserDeserializer: ParserDeserializer,
                                   didFinishDeserializingParser parser: Parser,
                                   from JSONValue: JSONValue) {
        if !parsers.contains(parser) {
            parsers.append(parser)
        }
    }
}
