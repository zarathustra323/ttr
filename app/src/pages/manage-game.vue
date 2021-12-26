<template>
  <div class="d-flex justify-content-between align-items-center">
    <h1 class="mb-0">
      Manage Game
    </h1>
    <div class="d-flex gap-2">
      <div>
        <button type="button" class="btn btn-danger" @click="deleteGame">
          Delete
        </button>
      </div>
    </div>
  </div>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link to="/">
          Games
        </router-link>
      </li>
      <li class="breadcrumb-item active" aria-current="page">
        {{ gameData.name }} Game ({{ createdDate }})
      </li>
    </ol>
  </nav>
  <hr>

  <div class="card">
    <div class="card-header">
      <player-nav
        :players="game.players"
        :active-color-id="activeColorId"
        @select-player="activeColorId = $event"
      />
    </div>
    <player-card
      :player="activePlayer"
      :all-nodes="game.graph.nodes"
      :all-edges="game.graph.edges"
      :all-ticket-nodes="game.ticketGraph.nodes"
      :all-ticket-edges="game.ticketGraph.edges"
      @claim-edge="claimRoute"
      @remove-edge="removeRoute"
      @claim-ticket="claimTicket"
      @remove-ticket="removeTicket"
    />
  </div>
</template>

<script>
import Game from '../game';
import PlayerCard from '../components/manage-game/player-card.vue';
import PlayerNav from '../components/manage-game/player-nav.vue';
import storage from '../storage';
import dayjs from '../dayjs';
import gameData from '../../data';

export default {
  components: {
    PlayerCard,
    PlayerNav,
  },
  data: () => ({
    game: null,
    activeColorId: null,
  }),

  created() {
    const serialized = storage.get(this.gameStorageId);
    const game = Game.deserialize(serialized);
    const [firstPlayerColorId] = game.players.keys();
    this.activeColorId = firstPlayerColorId;
    this.game = game;
  },

  computed: {
    gameStorageId() {
      return `game-${this.$route.params.gameId}`;
    },
    gameTypeId() {
      return this.game.typeId;
    },
    gameData() {
      return gameData.get(this.gameTypeId);
    },
    createdDate() {
      const date = new Date(this.game.created);
      return dayjs(date).format('MMM Do, YYYY @ HH:mma');
    },
    activePlayer() {
      return this.game.players.get(this.activeColorId);
    },
  },

  methods: {
    claimRoute({ player, edge }) {
      this.game.claimRoute({
        fromId: edge.fromId,
        toId: edge.toId,
        colorId: edge.data.color,
        playerColorId: player.color.id,
      });
      this.save();
    },

    removeRoute({ player, edge }) {
      this.game.removeRoute({
        edge,
        playerColorId: player.color.id,
      });
      this.save();
    },

    claimTicket({ player, edge }) {
      this.game.claimTicket({
        fromId: edge.fromId,
        toId: edge.toId,
        playerColorId: player.color.id,
      });
      this.save();
    },

    removeTicket({ player, edge }) {
      this.game.removeTicket({
        edge,
        playerColorId: player.color.id,
      });
      this.save();
    },

    deleteGame() {
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure you want to delete this game?')) {
        const { id } = this.game;
        storage.remove(`game-${id}`);
        storage.pop('gameIds', id);
        this.$router.push('/');
      }
    },

    save() {
      storage.set(this.gameStorageId, this.game.serialize());
    },
  },
};
</script>
