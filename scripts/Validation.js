//faire la validation

class Validation {
    isValidTask(task) {
        return {importanceValid: !!task.importance, nameIsValid: !!task.tache}
    }
}
