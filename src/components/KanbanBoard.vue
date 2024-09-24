<script lang="ts" setup>
import { ref } from 'vue';

interface Card {
  id: number;
  title: string;
  description: string;
  editing: boolean;
}

interface Column {
  id: number;
  title: string;
  cards: Card[];
}

const columns = ref<Column[]>([
  {
    id: 1,
    title: 'To Do',
    cards: [
      { id: 1, title: 'Add a backend', description: 'Add backend Rest API etc. so clients can share kanbanboard', editing: false  },
      { id: 2, title: 'Add database to backend', description: 'Probably nosql mongo.db no need for sql...', editing: false  }
    ]
  },
  {
    id: 2,
    title: 'In Progress',
    cards: [
      { id: 3, title: 'Add save button for editing', description: 'Make a save button to quit editing and save changes', editing: false  }
    ]
  },
  {
    id: 3,
    title: 'Done',
    cards: [
      { id: 4, title: 'Send to FysioFresh', description: 'Share the code with FysioFresh via. github', editing: false  },
      { id: 5, title: 'Make drag-able cards', description: 'Make a drag event to drag cards on kanbanboard', editing: false },
      { id: 6, title: 'Make Kanbanboard', description: 'Make a simple kanbanboard', editing: false  },
      { id: 7, title: 'Editable Kanbanboard', description: 'Make kanbanboard editable when double clicking', editing: false  }
    ]
  }
]);

let draggedCard = ref<Card | null>(null);
let draggedFromColumnId = ref<number | null>(null);

const dragStart = (card: Card, columnId: number) => {
  draggedCard.value = card;
  draggedFromColumnId.value = columnId;
};

const drop = (targetColumnId: number) => {
  if (draggedCard.value && draggedFromColumnId.value !== null) {
    const fromColumn = columns.value.find(c => c.id === draggedFromColumnId.value);
    const toColumn = columns.value.find(c => c.id === targetColumnId);

    if (fromColumn && toColumn) {
      fromColumn.cards = fromColumn.cards.filter(card => card.id !== draggedCard.value?.id);
      toColumn.cards.push(draggedCard.value);
      draggedCard.value = null;
      draggedFromColumnId.value = null;
    }
  }
};

const enableEdit = (card: Card) => {
  card.editing = true;
};

const saveEdit = (card: Card) => {
  card.editing = false;
};

const handleKeyPress = (card: Card, event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    saveEdit(card); // Save and exit edit mode when pressing Enter
  }
};
</script>

<template>
  <v-container fluid class="kanban-container">
    <h1 class="text-center">Kanbanboard</h1>
    <v-row>
      <v-col v-for="column in columns" :key="column.id" class="kanban-column">
        <v-card outlined @dragover.prevent @drop="drop(column.id)" class="kanban-card">
          <v-card-title>{{ column.title }}</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                  v-for="card in column.cards"
                  :key="card.id"
                  draggable="true"
                  @dragstart="dragStart(card, column.id)"
                  @dblclick="enableEdit(card)"
              >
                <template v-if="card.editing">
                  <v-text-field
                      v-model="card.title"
                      label="Title"
                      @keyup.enter="handleKeyPress(card, $event)"
                  ></v-text-field>
                  <v-textarea
                      v-model="card.description"
                      label="Description"
                      @keyup.enter="handleKeyPress(card, $event)"
                  ></v-textarea>
                  <v-btn @click="saveEdit(card)">Save</v-btn>
                </template>
                <template v-else>
                  <v-list-item-title>{{ card.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ card.description }}</v-list-item-subtitle>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .kanban-container {
    height: 100%;
    width: 100%;
    padding: 20px;
  }

  .kanban-column {
    height: 100%;
  }

  .kanban-card {
    height: 100%;
  }
</style>
