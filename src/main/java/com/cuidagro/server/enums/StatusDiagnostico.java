package com.cuidagro.server.enums;

public enum StatusDiagnostico {
    DIAGNOSTICO_PARCIAL,
    DIAGNOSTICO_MEDICO,
    DIAGNOSTICO_PARCIAL_FALSO,
    DIAGNOSTICO_PARCIAL_POSITIVO;

    public static boolean conferidoPorMedico(StatusDiagnostico status) {
        return status != DIAGNOSTICO_PARCIAL;
    }
}
