import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import KanbanBoard from '../KanbanBoard.vue';

describe('KanbanBoard', () => {

    it('renders kanban columns', () => {
        const wrapper = mount(KanbanBoard);
        expect(wrapper.findAll('.v-card-title').length).toBe(3); // Tjekker for 3 kolonner
    });
});
