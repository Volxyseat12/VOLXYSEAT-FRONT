using System.Text.Json;
using System.Text.Json.Serialization;

public static class MockDataLoader
{
    private static readonly JsonSerializerOptions JsonOptions = new JsonSerializerOptions
    {
        Converters = { new JsonStringEnumConverter() },
        PropertyNameCaseInsensitive = true
    };

    public static T LoadMockData<T>(string key, string filePath)
    {
        if (string.IsNullOrWhiteSpace(filePath) || !File.Exists(filePath))
        {
            throw new FileNotFoundException("Mock data file not found.", filePath);
        }

        var json = File.ReadAllText(filePath);
        var mockData = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(json, JsonOptions);

        if (mockData == null || !mockData.TryGetValue(key, out var element))
        {
            throw new KeyNotFoundException($"Key '{key}' not found in mock data.");
        }

        return JsonSerializer.Deserialize<T>(element.GetRawText(), JsonOptions);
    }
}
