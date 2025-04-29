<style lang="scss">
  :global {
    .interactive-hero-images {
      width: 99vw;
      height: inherit;
      margin: 0;
      margin-left: calc(50% - 50vw) !important;
      display: flex;
      flex-direction: column;
      margin-bottom: 0;
      margin-top: var(--od-space-component-margin, 80px);
      & + .Header {
        margin-top: 0;
      }
    }
  }
</style>
