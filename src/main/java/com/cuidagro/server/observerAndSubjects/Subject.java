package com.cuidagro.server.observerAndSubjects;

import com.cuidagro.server.Alerta;
import java.util.ArrayList;
import java.util.List;

public abstract class Subject {
    private List<Observer> observers = new ArrayList<>();

    public void adicionarObserver(Observer observer) {
        this.observers.add(observer);
    }

    public void removerObserver(Observer observer) {
        this.observers.remove(observer);
    }

    protected void notificarObservers(Alerta alerta) {
        for (Observer observer : observers) {
            observer.atualizar(alerta);
        }
    }
}