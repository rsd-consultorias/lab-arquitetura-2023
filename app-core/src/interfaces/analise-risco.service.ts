import { AnaliseRiscoRequest, AnaliseRiscoResponse } from "../types/analise-riscos.types";

export interface IAnaliseRiscoService {
    analisar(request: AnaliseRiscoRequest): Promise<AnaliseRiscoResponse>;
}