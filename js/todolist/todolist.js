(function(ko) {
    let ChecklistViewModel = function(checklist) {
        let self = this

        this.checklist = checklist
        this.newTaskTitle = ko.observable('')
        this.tasks = ko.observableArray()
        this.completedTasks = ko.observableArray()

        this.addTask = function() {
            this.checklist.addTask(this.newTaskTitle())
            this.newTaskTitle('')
            this.tasks(this.checklist.tasks)
        }

        this.removeTask = function(taskObject, event) {
            self.checklist.removeTask(taskObject.id)
            self.tasks(self.checklist.tasks)
        }

        this.checkTask = function(taskObject, event) {
            self.checklist.checkTask(taskObject.id)
            self.tasks(self.checklist.tasks)
            self.completedTasks(self.checklist.completedTasks)
        }

        this.undoTask = function(taskObject, event) {
            self.checklist.undoTask(taskObject.id)
            self.tasks(self.checklist.tasks)
            self.completedTasks(self.checklist.completedTasks)
        }

        this.onEnter = function(taskObject, event) {
            if (event.key == 'Enter') {this.addTask()}
        }
    }

    let Checklist = function() {
        this.tasks = []
        this.completedTasks = []

        this.addTask = function(taskTitle) {
            this.tasks.push({
                id: this.tasks.length, 
                title: taskTitle
            })
        }

        this.removeTask = function(id) {
            let taskIndex = this.getIndexById(id, this.tasks)
            if (typeof taskIndex !== 'undefined') {
                this.tasks.splice(taskIndex, 1)
            }
        }

        this.checkTask = function(id) {
            let taskIndex = this.getIndexById(id, this.tasks)
            let task
            if (typeof taskIndex !== 'undefined') {
                task = this.tasks[taskIndex]
                this.tasks.splice(taskIndex, 1)
                this.completedTasks.push(task)
            }
        }

        this.undoTask = function(id) {
            let taskIndex = this.getIndexById(id, this.completedTasks)
            let task
            if (typeof taskIndex !== 'undefined') {
                task = this.completedTasks[taskIndex]
                this.completedTasks.splice(taskIndex, 1)
                this.tasks.push(task)
            }
        }

        this.getIndexById = function(id, tasks) {
            let index

            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].id == id) {
                    index = i
                    break
                }
            }

            return index
        }
    }

    let checklist = new Checklist()

    ko.applyBindings(new ChecklistViewModel(checklist), document.getElementById('todolist'))

}) (ko)

