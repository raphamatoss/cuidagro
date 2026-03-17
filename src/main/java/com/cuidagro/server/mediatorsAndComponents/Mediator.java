package com.cuidagro.server.mediatorsAndComponents;

public interface Mediator {
    void signal(Component componente, String evento);
}
