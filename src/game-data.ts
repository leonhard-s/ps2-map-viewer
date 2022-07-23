/**
 * Repository for static game data.
 * 
 * This class is implemented as a singleton and must be manually loaded upon
 * application startup using the async load() method. After loading, you can
 * retrieve the singleton instance using the getInstance() method.
 */
class GameData {
    // Singleton-related fields
    private static _instance: GameData;
    private static _loading: Promise<GameData>;
    private static _loaded: boolean = false;

    // Game data fields
    private _continents: Api.Continent[];
    private _servers: Api.Server[];

    private constructor() {
        this._continents = [];
        this._servers = [];
    }

    // Getters

    public continents(): Api.Continent[] { return this._continents; }

    public servers(): Api.Server[] { return this._servers; }

    /**
     * Loads the game data from the API.
     */
    public static async load(): Promise<GameData> {
        if (this._loaded)
            return this._instance;
        if (this._loading)
            return this._loading;
        // Otherwise, start loading the data
        this._loading = this._loadInternal();
        return this._loading;
    }

    /**
     * Returns the singleton instance of the game data.
     * 
     * This method must be called after the data has been loaded.
     */
    public static getInstance(): GameData {
        if (!this._loaded)
            throw new Error("Game data not loaded");
        return this._instance;
    }

    private static async _loadInternal(): Promise<GameData> {
        const continents = Api.getContinentList();
        const servers = Api.getServerList();
        const loading = Promise.all([continents, servers])
            .then(([continents, servers]) => {
                const instance = new GameData();
                instance._continents = continents;
                instance._servers = servers;
                this._instance = instance;
                this._loaded = true;
                return instance;
            });
        return loading;
    }
}

