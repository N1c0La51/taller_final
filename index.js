const readlineSync = require('readline-sync');

class Asignatura {
    #horas;
    constructor(nombre, horas, esDiurno) {
        if (!nombre) {
            throw new Error(`La asignatura debe tener un nombre.`);
        }
        if (!horas) {
            throw new Error(`La asignatura debe tener unas horas establecidas.`);
        }
        this.nombre = nombre;
        this.horas = horas;
        this.esDiurno = esDiurno;
    }

    get horas() {
        return this.#horas;
    }

    set horas(nuevoValorHoras) {
        if (nuevoValorHoras < 0) {
            throw new Error(`El valor de las horas de la asignatura no puede ser un valor negativo.`);
        }
        this.#horas = nuevoValorHoras;
    }
}

class NodoAsignatura {
    constructor(asignatura) {
        this.valor = asignatura;
        this.siguiente = null;
    }
}

class listaAsignatura {
    constructor() {
        this.head = null;
    }

    agregarAsignatura(asignatura) {
        const nuevoNodo = new NodoAsignatura(asignatura);

        if (this.head == null) {
            this.head = nuevoNodo;
        } else {
            let nodoTmp = this.head;
            while (nodoTmp.siguiente != null) {
                nodoTmp = nodoTmp.siguiente;
            }

            nodoTmp.siguiente = nuevoNodo;
        }
    }

    obtenerAsignaturas() {
        const asignaturas = [];
        let nodoTmp = this.head;
        while (nodoTmp != null) {
            asignaturas.push(nodoTmp.valor);
            nodoTmp = nodoTmp.siguiente;
        }

        return asignaturas;
    }
}

class Programa {
    constructor(nombre, tipo) {
        if (!nombre) {
            throw new Error(`El programa debe tener un nombre.`);
        }
        if (!tipo) {
            throw new Error(`Se debe saber si el programa es diurno o nocturno.`);
        }
        this.nombre = nombre;
        this.tipo = tipo;
        this.asignaturas = new listaAsignatura();
    }

    agregarAsignatura(asignatura) {
        this.asignaturas.agregarAsignatura(asignatura);
    }

    obtenerAsignaturas() {
        return this.asignaturas.obtenerAsignaturas();
    }
}

class NodoPrograma {
    constructor(programa) {
        this.valor = programa;
        this.siguiente = null;
    }
}

class ListaPrograma {
    constructor() {
        this.head = null;
    }

    insertarPrograma(programa) {
        const nuevoNodo = new NodoPrograma(programa);

        if (this.head == null) {
            this.head = nuevoNodo;
        } else {
            let nodoTmp = this.head;
            while (nodoTmp.siguiente != null) {
                nodoTmp = nodoTmp.siguiente;
            }

            nodoTmp.siguiente = nuevoNodo;
        }
    }

    obtenerProgramas() {
        const programas = [];
        let nodoTmp = this.head;
        while (nodoTmp != null) {
            programas.push(nodoTmp.valor);
            nodoTmp = nodoTmp.siguiente;
        }
        return programas;
    }
}

class Profesor {
    #tarifaHora;
    #horasTrabajadas;

    constructor(nombre, tipo, tarifaHora, horasTrabajadas, titulacion) {
        if (!nombre) {
            throw new Error(`El profesor requiere un nombre.`);
        }
        if (!tipo) {
            throw new Error(`El profesor debe tener al menos un tipo seleccionado.`);
        }
        if (!tarifaHora || tarifaHora < 0) {
            throw new Error(`El profesor debe tener una tarifa por hora definida válida.`);
        }
        if (!horasTrabajadas || horasTrabajadas < 0) {
            throw new Error(`El profesor debe tener horas trabajadas definidas válidas.`);
        }
        this.nombre = nombre;
        this.tipo = tipo;
        this.tarifaHora = tarifaHora;
        this.horasTrabajadas = horasTrabajadas;
        this.programas = new ListaPrograma();
        this.titulacion = titulacion;
    }

    get tarifaHora() {
        return this.#tarifaHora;
    }

    set tarifaHora(nuevoValorTarifa) {
        if (nuevoValorTarifa < 0) {
            throw new Error(`El valor de la tarifa no puede ser un valor negativo.`);
        }
        this.#tarifaHora = nuevoValorTarifa;
    }

    get horasTrabajadas() {
        return this.#horasTrabajadas;
    }

    set horasTrabajadas(nuevoValorHoras) {
        if (nuevoValorHoras < 0) {
            throw new Error(`El valor de las horas no puede ser negativo`);
        }
        this.#horasTrabajadas = nuevoValorHoras;
    }

    asignarPrograma(programa) {
        this.programas.insertarPrograma(programa);
    }

    calcularSalario() {
        let tarifaFinal = this.tarifaHora;
        if (this.tipo.toLowerCase() === 'catedratico asociado') {
            tarifaFinal *= 1.07;
        }

        this.programas.obtenerProgramas().forEach(programa => {
            if (programa.tipo.toLowerCase() === 'diurno') {
                tarifaFinal *= 1 + 0.07; 
            } else if (programa.tipo.toLowerCase() === 'nocturno') {
                tarifaFinal *= 1 + 0.12;
            }
        });

        return this.horasTrabajadas * tarifaFinal;
    }
}

class NodoProfesor {
    constructor(profesor) {
        this.valor = profesor;
        this.siguiente = null;
    }
}

class ListaProfesor {
    constructor() {
        this.head = null;
    }

    insertarProfesor(profesor) {
        const nuevoNodo = new NodoProfesor(profesor);

        if (this.head == null) {
            this.head = nuevoNodo;
        } else {
            let nodoTmp = this.head;
            while (nodoTmp.siguiente != null) {
                nodoTmp = nodoTmp.siguiente;
            }

            nodoTmp.siguiente = nuevoNodo;
        }
    }

    obtenerProfesores() {
        const profesores = [];
        let nodoTmp = this.head;
        while (nodoTmp != null) {
            profesores.push(nodoTmp.valor);
            nodoTmp = nodoTmp.siguiente;
        }
        return profesores;
    }

    calcularSalarioTotal() {
        let salarioTotal = 0;
        let nodoTmp = this.head;
        while (nodoTmp != null) {
            salarioTotal += nodoTmp.valor.calcularSalario();
            nodoTmp = nodoTmp.siguiente;
        }
        return salarioTotal;
    }
}

function ingresarDatosProfesor(asignaturas) {
    const nombreProfesor = readlineSync.question(`Ingrese el nombre del profesor: `);
    const tipoProfesor = readlineSync.question(`Ingrese el tipo del profesor: `);
    const tarifaHora = parseFloat(readlineSync.question(`Ingrese la tarifa por hora del profesor: `));
    const titulacion = readlineSync.question(`Ingrese la titulacion del profesor: `);
    const horasExtra = readlineSync.question(`El profesor hizo horas extra? (si/no): `);
    let horasTrabajadas = 0;

    asignaturas.forEach(asignatura => {
        horasTrabajadas += asignatura.horas;
    });

    if (horasExtra.toLowerCase() === 'si') {
        const horasExtras = parseFloat(readlineSync.question(`Ingrese la cantidad de horas extra trabajadas: `));
        horasTrabajadas += horasExtras;
    }

    return new Profesor(nombreProfesor, tipoProfesor, tarifaHora, horasTrabajadas, titulacion);
}

const programaIngenieria = new Programa('Ingenieria de Sistemas', 'diurno');
const programaPsicologia = new Programa('Psicologia', 'nocturno');

const asignatura1 = new Asignatura('Programacion', 4, true);
const asignatura2 = new Asignatura('Psicologia Social', 3, false);

programaIngenieria.agregarAsignatura(asignatura1);
programaIngenieria.agregarAsignatura(asignatura2);

const listaProfesores = new ListaProfesor();
const cantidadProfesores = parseInt(readlineSync.question(`Ingrese la cantidad de profesores a registrar: `));

for (let i = 0; i < cantidadProfesores; i++) {
    console.log(`Ingrese los datos del profesor ${i + 1}:`);
    const datosProfesor = ingresarDatosProfesor([asignatura1, asignatura2]);
    console.log('Lista de programas disponibles: ');
    console.log('1. Ingenieria de Sistemas (diurno)');
    console.log('2. Psicologia (nocturno)');
    const opcionPrograma = parseInt(readlineSync.question('Seleccione un programa (1 o 2): '));
    if (opcionPrograma !== 1 && opcionPrograma !== 2) {
        throw new Error(`Opcion de programa no valida.`);
    }

    switch (opcionPrograma) {
        case 1:
            datosProfesor.asignarPrograma(programaIngenieria);
            break;
        case 2:
            datosProfesor.asignarPrograma(programaPsicologia);
            break;
        default:
            throw new Error('Opción de programa no válida.');
    }

    listaProfesores.insertarProfesor(datosProfesor);
}

console.log('Información de los profesores:');
const profesores = listaProfesores.obtenerProfesores();
profesores.forEach((profesor, index) => {
    console.log(`Profesor ${index + 1}:`);
    console.log(`Nombre: ${profesor.nombre}`);
    console.log(`Tipo: ${profesor.tipo}`);
    console.log(`El salario de ${profesor.nombre} es: $${profesor.calcularSalario()}`);
    console.log(`Se ha asignado el programa "${profesor.programas.obtenerProgramas()[0].nombre}" al profesor ${profesor.nombre}.`);
});

function calcularProemdioCostoProfesoresDia() {
    const profesoresDia = profesores.filter(profesor => {
        return profesor.programas.obtenerProgramas().some(p => p.tipo === 'diurno');
    });

    let costoTotalProfesorDia = 0;
    profesoresDia.forEach(profesor => {
        costoTotalProfesorDia += profesor.calcularSalario();
    });

    const promedioCostoProfesoresDia = costoTotalProfesorDia / profesoresDia.length;
    console.log(`El promedio de costo de los profesores que dan clases en el día es: $${promedioCostoProfesoresDia.toFixed(2)}`);
}

function calcularCostoTotalNomina(programa) {
    const profesoresEnPrograma = profesores.filter(profesor => {
        return profesor.programas.obtenerProgramas().some(p => p.nombre === programa);
    });

    let costoTotalNomina = 0;
    profesoresEnPrograma.forEach(profesor => {
        costoTotalNomina += profesor.calcularSalario();
    });

    console.log(`El costo total de la nómina del programa ${programa} es: $${costoTotalNomina}`);
}

function calcularSalarioProfesoresCatedraticos() {
    const profesoresCatedraticos = profesores.filter(profesor => profesor.tipo.toLowerCase() === 'catedratico');
    let costoTotalProfesoresCatedraticos = 0;

    profesoresCatedraticos.forEach(profesor => {
        costoTotalProfesoresCatedraticos += profesor.calcularSalario();
    });

    console.log(`El costo total de los salarios de los profesores catedráticos es: $${costoTotalProfesoresCatedraticos}`);
}

function calcularSalarioProfesoresPlanta() {
    const profesoresPlanta = profesores.filter(profesor => profesor.tipo.toLowerCase() === 'planta');
    let costoTotalProfesoresPlanta = 0;

    profesoresPlanta.forEach(profesor => {
        costoTotalProfesoresPlanta += profesor.calcularSalario();
    });

    console.log(`El costo total de los salarios de los profesores de planta es: $${costoTotalProfesoresPlanta}`);
}

function contarProfesoresConMaestria(profesores) {
    let contadorMaestria = 0;

    profesores.forEach(profesor => {
        if (profesor.titulacion.toLowerCase() === 'maestria') {
            contadorMaestria++;
        }
    });

    console.log(`El número de profesores con maestría es: ${contadorMaestria}`);
}

calcularCostoTotalNomina('Ingenieria de Sistemas');
calcularCostoTotalNomina('Psicologia');
calcularProemdioCostoProfesoresDia();
calcularSalarioProfesoresCatedraticos();
contarProfesoresConMaestria(profesores);
calcularSalarioProfesoresPlanta();

const salarioTotal = listaProfesores.calcularSalarioTotal();
console.log(`El salario total de todos los profesores es: $${salarioTotal}`);
